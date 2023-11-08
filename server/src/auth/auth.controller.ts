import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto)
  }

  @HttpCode(200)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto)
  }

  @HttpCode(200)
  @Post('login/access-token')
  @UsePipes(new ValidationPipe())
  async getNewToken(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewToken(dto.refreshToken)
  }
}
