import { Prisma } from '@prisma/client'
import { userSelectObject } from 'src/user/userSelect.object'

export const reviewSelectObject: Prisma.ReviewSelect = {
  id: true,
  rating: true,
  text: true,
  user: {
    select: userSelectObject
  },
  createdAt: true
}
