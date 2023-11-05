import { ICategory } from './category.interface'
import { IReview } from './review.interface'

export interface IProduct {
  id: number
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: ICategory
  reviews: IReview[]
  createdAt: Date
}

export interface IProductDetails {
  product: IProduct
}
