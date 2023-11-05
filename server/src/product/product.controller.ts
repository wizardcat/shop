import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GetAllProductDto } from './dto/get-all.products.dto'
import { ProductDto } from './dto/product.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDTO: GetAllProductDto) {
    return this.productService.getAll(queryDTO)
  }

  @Get('similar/:id')
  async getSimilar(@Param('id') id: string) {
    return this.productService.getSimilar(+id)
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productService.bySlug(slug)
  }

  @Get('by-category/:categorySlug')
  async getProductByCategory(@Param('categorySlug') categorySlug: string) {
    return this.productService.byCategory(categorySlug)
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id') id: string) {
    return this.productService.byId(+id)
  }

  @HttpCode(200)
  @Post(':categoryId')
  @UsePipes(new ValidationPipe())
  @Auth()
  async create(@Param('categoryId') categoryId: string) {
    return this.productService.create(+categoryId)
  }

  @HttpCode(200)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  @Auth()
  async update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(+id, dto)
  }

  @HttpCode(200)
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @Auth()
  async delete(@Param('id') id: string) {
    return this.productService.delete(+id)
  }
}
