import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { slugify } from 'src/utils/slugify'
import { categorySelectObject } from './categorySelect.object'
import { CategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategory(where: Prisma.CategoryWhereUniqueInput) {
    const category = await this.prisma.category.findUnique({
      where,
      select: categorySelectObject
    })

    if (!category) throw new NotFoundException('Category not found')

    return category
  }

  async getAllCategories() {
    return this.prisma.category.findMany({
      select: categorySelectObject
    })
  }

  async addCategory() {
    return this.prisma.category.create({
      data: { name: '', slug: '' }
    })
  }

  async updateCategory(id: number, dto: CategoryDto) {
    return this.prisma.category.update({
      where: {
        id
      },
      data: { name: dto.name, slug: slugify(dto.name) }
    })
  }

  async deleteCategory(id: number) {
    return this.prisma.category.delete({
      where: {
        id
      }
    })
  }
}
