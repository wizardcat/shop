import { Prisma } from '@prisma/client'
import { mainUserInfo } from 'src/user/main-user-info.object'

export const returnReviewObject: Prisma.ReviewSelect = {
  id: true,
  rating: true,
  text: true,
  user: {
    select: mainUserInfo
  },
  createdAt: true
}
