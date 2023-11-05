import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'
import { mainUserInfo } from './main-user-info.object'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserProfileById(id: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      select: {
        ...mainUserInfo,
        favorities: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true
          }
        },
        ...selectObject
      }
    })

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  async updateUserProfile(id: number, dto: UserDto) {
    const emailPresens = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (emailPresens && emailPresens.id !== id)
      throw new BadRequestException('Email already in use')

    const user = await this.getUserProfileById(id)

    return await this.prisma.user.update({
      where: {
        id
      },
      data: {
        name: dto.name,
        password: dto.password ? await hash(dto.password) : user.password,
        phone: dto.phone,
        email: dto.email,
        avatarPath: dto.avatarPath
      }
    })
  }

  async updateUserFavoriteProductList(userId: number, productId: number) {
    const user = await this.getUserProfileById(userId)

    if (!user) throw new NotFoundException('User Not Found!')

    const isExists = user.favorities.some(product => product.id === productId)

    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        favorities: {
          [isExists ? 'disconnect' : 'connect']: {
            id: productId
          }
        }
      }
    })

    return { message: 'Success' }
  }
}
