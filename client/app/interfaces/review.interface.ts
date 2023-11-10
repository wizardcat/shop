import { User } from './user.interface'

export interface Review {
  id: number
  rating: number
  text: string
  user: User
  createdAt: Date
}

export interface ReviewData {
  rating: number
  text: string
}
