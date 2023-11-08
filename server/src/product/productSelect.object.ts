import { Prisma } from '@prisma/client'
import { categorySelectObject } from 'src/category/categorySelect.object'
import { reviewSelectObject } from 'src/review/reviewSelect.object'

export const productSelectObject: Prisma.ProductSelect = {
  images: true,
  description: true,
  id: true,
  name: true,
  price: true,
  createdAt: true,
  slug: true
}

export const productAllSelectObject: Prisma.ProductSelect = {
  ...productSelectObject,
  reviews: {
    select: reviewSelectObject
  },
  category: {
    select: categorySelectObject
  }
}
