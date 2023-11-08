import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ReviewDto } from './dto/review.dto'
import { reviewSelectObject } from './reviewSelect.object'

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getReviews() {
    return this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: reviewSelectObject
    })
  }

  async addReview(userId: number, productId: number, dto: ReviewDto) {
    return this.prisma.review.create({
      data: {
        ...dto,
        product: {
          connect: {
            id: productId
          }
        },
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  async getAverageRating(productId: number) {
    return this.prisma.review
      .aggregate({
        where: { productId },
        _avg: { rating: true }
      })
      .then(data => data._avg)
  }
}
