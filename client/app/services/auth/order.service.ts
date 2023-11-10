import { instance } from '@/api/api.interceptor'
import { EnumServicePath } from '@/api/const'
import { Order } from '@/interfaces/order.interface'

export const OrderService = {
  async getAllOrders() {
    return instance<Order[]>({
      url: EnumServicePath.ORDERS,
      method: 'GET'
    })
  }
}
