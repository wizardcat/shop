import { instance } from '@/api/api.interceptor'
import { EnumServicePath } from '@/api/const'
import { PaymentResponse } from '@/interfaces/payment.interface'

export const PaymentService = {
  async createPayment(amount: number) {
    return instance.post<PaymentResponse>(EnumServicePath.PAYMENT, {
      amount
    })
  }
}
