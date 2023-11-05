import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async getMainStatistics(userId: number) {
    const user = await this.userService.byId(userId, {
      orders: {
        select: {
          items: true
        }
      },
      reviews: true
    })

    const totalAmount = await this.prisma.$queryRaw`select sum(oi.price)
    from "order" o
    join order_item oi on oi.order_id=o.id 
    where o.user_id=${userId}
     `

    return [
      {
        name: 'Orders',
        value: user.orders.length
      },
      {
        name: 'Reviews',
        value: user.reviews.length
      },
      {
        name: 'Favorities',
        value: user.favorities.length
      },
      {
        name: 'Total',
        value: totalAmount[0].sum || 0
      }
    ]
  }
}
