import { Prisma } from '@prisma/client'

export const userSelectObject: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  password: false,
  avatarPath: true,
  phone: true
}
