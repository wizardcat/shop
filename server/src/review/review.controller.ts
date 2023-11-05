import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ReviewDto } from './dto/review.dto'
import { ReviewService } from './review.service'

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAll() {
    return this.reviewService.getAll()
  }

  @HttpCode(200)
  @Post('leave/:productId')
  @UsePipes(new ValidationPipe())
  @Auth()
  async leaveReview(
    @CurrentUser('id') userId: number,
    @Body() dto: ReviewDto,
    @Param('productId') productId: string
  ) {
    return this.reviewService.create(userId, +productId, dto)
  }
}
