import { faker } from '@faker-js/faker'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma, User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  private async getUser(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where
    })

    return user
  }

  async register(dto: AuthDto) {
    const user = await this.getUser({
      email: dto.email
    })

    if (user) throw new BadRequestException('User alrady exists')

    const newUser = await this.prisma.user.create({
      data: {
        name: faker.internet.userName(),
        password: await hash(dto.password),
        phone: faker.phone.number(),
        email: dto.email,
        avatarPath: faker.image.avatar()
      }
    })

    const tokens = await this.issueTokens(newUser.id)

    return {
      user: this.returnUserFields(newUser),
      ...tokens
    }
  }

  async getNewToken(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken)

    if (!result) throw new UnauthorizedException('Invalid refresh token')

    const user = await this.getUser({
      id: result.id
    })

    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }

  private async issueTokens(userId: number) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d'
    })

    return { accessToken, refreshToken }
  }

  private returnUserFields(user: User) {
    return { id: user.id, email: user.email }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.getUser({
      email: dto.email
    })

    if (!user) throw new NotFoundException('User not found')

    const isPassValid = await verify(user.password, dto.password)

    if (!isPassValid) throw new UnauthorizedException('Invalid password')

    return user
  }
}
