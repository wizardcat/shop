import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getUserInfo(@CurrentUser('id') id: number) {
    return this.userService.getUserProfileById(id)
  }

  @HttpCode(200)
  @Put('profile')
  @UsePipes(new ValidationPipe())
  @Auth()
  async updateUserUserInfo(
    @CurrentUser('id') id: number,
    @Body() dto: UserDto
  ) {
    return this.userService.updateUserProfile(id, dto)
  }

  @HttpCode(200)
  @Patch('profile/favorities/:productId')
  @Auth()
  async updateUserFavoriteProductList(
    @CurrentUser('id') userId: number,
    @Param('productId') productId: string
  ) {
    return this.userService.updateUserFavoriteProductList(userId, +productId)
  }
}
