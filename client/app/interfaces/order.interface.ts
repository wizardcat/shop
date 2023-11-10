import { CartItem } from './cart.interface'
import { User } from './user.interface'

export enum OrderStatus {
  PENDING = 'pending',
  PAYED = 'payed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered'
}

export interface Order {
  id: number
  items: CartItem[]
  status: OrderStatus
  user: User
  createdAt: string
}
