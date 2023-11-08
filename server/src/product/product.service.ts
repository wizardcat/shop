import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { EnumProductSort } from 'src/types'
import { slugify } from 'src/utils/slugify'
import { ProductDto } from './dto/product.dto'
import { ProductSortDto } from './dto/productSort.dto'
import { productAllSelectObject } from './productSelect.object'

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async getAllProducts(dto: ProductSortDto = {}) {
    const { sort, searchTerm } = dto

    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

    if (sort === EnumProductSort.LOW_PRICE) {
      prismaSort.push({ price: 'asc' })
    } else if (sort === EnumProductSort.HIGH_PRICE) {
      prismaSort.push({ price: 'desc' })
    } else if (sort === EnumProductSort.OLDEST) {
      prismaSort.push({ createdAt: 'desc' })
    } else {
      prismaSort.push({ createdAt: 'asc' })
    }

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              category: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive'
                }
              }
            },
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            }
          ]
        }
      : {}

    const { perPage, skip } = this.paginationService.getPagination(dto)

    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage
    })

    return {
      products,
      length: await await this.prisma.product.count({
        where: prismaSearchTermFilter
      })
    }
  }

  // async getProductByIdOrSlug<T extends Prisma.ProductFindUniqueArgs>(
  //   args: Prisma.SelectSubset<T, Prisma.ProductFindUniqueArgs>
  // ) {
  //   const product = await this.prisma.product.findUnique({
  //     where: {
  //       ...args?.where
  //     },
  //     select: productAllSelectObject
  //   })

  //   if (!product) throw new NotFoundException('Product not found')

  //   return product
  // }

  async getProduct(where: Prisma.ProductWhereUniqueInput) {
    const product = await this.prisma.product.findUnique({
      where,
      select: productAllSelectObject
    })

    if (!product) throw new NotFoundException('Product not found')

    return product
  }

  async getProductByCategory(categorySlug: string) {
    const product = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug
        }
      },
      select: productAllSelectObject
    })

    if (!product) throw new NotFoundException('Product not found')

    return product
  }

  async getSimilarProduct(id: number) {
    const currentProduct = await this.getProduct({ id })

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.category.name
        },
        NOT: {
          id: currentProduct.id
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: productAllSelectObject
    })

    return products
  }

  async addProduct(categoryId: number) {
    const product = await this.prisma.product.create({
      //category ?
      data: {
        name: '',
        description: '',
        slug: '',
        price: 0,
        category: {
          connect: {
            id: categoryId
          }
        }
      }
    })
    return product.id
  }

  async updateProduct(id: number, dto: ProductDto) {
    const { name, price, description, images, categoryId } = dto

    return this.prisma.product.update({
      where: {
        id
      },
      data: {
        name,
        price,
        description,
        images,
        category: {
          connect: {
            id: categoryId
          }
        },
        slug: slugify(dto.name)
      }
    })
  }

  async deleteProduct(id: number) {
    return this.prisma.product.delete({
      where: {
        id
      }
    })
  }
}
