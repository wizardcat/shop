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
  async getAllCategories() {
    return this.categoryService.getAllCategories()
  }

  @Get('by-slug/:slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoryService.getCategory({ slug })
  }

  @Get(':id')
  @Auth()
  async getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategory({ id: +id })
  }

  @HttpCode(200)
  @Post()
  @UsePipes(new ValidationPipe())
  @Auth()
  async addCategory() {
    return this.categoryService.addCategory()
  }

  @HttpCode(200)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  @Auth()
  async updateCategory(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.updateCategory(+id, dto)
  }

  @HttpCode(200)
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @Auth()
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(+id)
  }
}
