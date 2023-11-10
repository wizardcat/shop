import { instance } from '@/api/api.interceptor'
import { EnumServicePath } from '@/api/const'
import { Review, ReviewData } from '@/interfaces/review.interface'

export const ReviewService = {
  async getAllReviews() {
    return instance<Review[]>({
      url: EnumServicePath.REVIEWS,
      method: 'GET'
    })
  },

  async addReview(productId: string, data: ReviewData) {
    return instance<Review[]>({
      url: `${EnumServicePath.REVIEWS}/leave/${productId}`,
      method: 'POST',
      data
    })
  }
}
