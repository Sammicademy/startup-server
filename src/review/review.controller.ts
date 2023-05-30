import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateReviewDto, EditReviewDto, GetByUserDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  @HttpCode(201)
  createReview(@Body() dto: CreateReviewDto) {
    return this.reviewService.createReview(dto);
  }

  @Delete('delete/:reviewId')
  @HttpCode(200)
  deleteReview(@Param('reviewId') reviewId: string) {
    return this.reviewService.deleteReview(reviewId);
  }

  @Put('edit/:reviewId')
  @HttpCode(200)
  editReview(@Param('reviewId') reviewId: string, @Body() dto: EditReviewDto) {
    return this.reviewService.editReview(reviewId, dto);
  }

  @Get('get/:courseId')
  @HttpCode(200)
  getReview(@Param('courseId') courseId: string) {
    return this.reviewService.getReview(courseId);
  }

  @Post('get-by-user')
  @HttpCode(200)
  getByUser(@Body() dto: GetByUserDto) {
    return this.reviewService.getByUser(dto);
  }
}
