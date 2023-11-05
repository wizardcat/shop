import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll()
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.bySlug(slug)
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id') id: string) {
    return this.categoryService.byId(+id)
  }

  @HttpCode(200)
  @Post()
  @UsePipes(new ValidationPipe())
  @Auth()
  async create() {
    return this.categoryService.create()
  }

  @HttpCode(200)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  @Auth()
  async update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(+id, dto)
  }

  @HttpCode(200)
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @Auth()
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(+id)
  }
}
