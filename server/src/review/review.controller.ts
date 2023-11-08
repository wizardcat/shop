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
  async getReviews() {
    return this.reviewService.getReviews()
  }

  @HttpCode(200)
  @Post('add/:productId')
  @UsePipes(new ValidationPipe())
  @Auth()
  async addReview(
    @CurrentUser('id') userId: number,
    @Body() dto: ReviewDto,
    @Param('productId') productId: string
  ) {
    return this.reviewService.addReview(userId, +productId, dto)
  }
}
