import { Category } from './category.interface'
import { Review } from './review.interface'

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: Category
  reviews: Review[]
  createdAt: Date
}

export interface ProductDetails {
  product: Product
}

export interface ProductData {
  name: string
  price: number
  description: string
  images: string[]
  categoryId: number
}

export enum ProductSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest'
}

export interface ProductDataFilters {
  sort?: ProductSort
  searchTerm?: string
  //move to sepeate type
  page?: string | number
  perPage?: string | number
}
