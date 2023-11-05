import { IUser } from './user.interface'

export interface IReview {
  id: number
  rating: number
  text: string
  user: IUser
  createdAt: Date
}
