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
import { ProductDto } from './dto/product.dto'
import { ProductSortDto } from './dto/productSort.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAllProducts(@Query() queryDTO: ProductSortDto) {
    return this.productService.getAllProducts(queryDTO)
  }

  @Get(':id')
  @Auth()
  async getProductById(@Param('id') id: string) {
    return this.productService.getProduct({ id: +id })
  }

  @Get('by-slug/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.getProduct({ slug })
  }

  @Get('by-category/:categorySlug')
  async getProductByCategory(@Param('categorySlug') categorySlug: string) {
    return this.productService.getProductByCategory(categorySlug)
    // return this.productService.getProduct({
    //   category: {
    //     slug: categorySlug
    //   }
    // })
  }

  @Get('similar/:id')
  async getSimilarProduct(@Param('id') id: string) {
    return this.productService.getSimilarProduct(+id)
  }

  @HttpCode(200)
  @Post(':categoryId')
  @UsePipes(new ValidationPipe())
  @Auth()
  async addProduct(@Param('categoryId') categoryId: string) {
    return this.productService.addProduct(+categoryId)
  }

  @HttpCode(200)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  @Auth()
  async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.updateProduct(+id, dto)
  }

  @HttpCode(200)
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @Auth()
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(+id)
  }
}
