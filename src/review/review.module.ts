import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { Review, ReviewSchema } from './review.model';
import { ReviewService } from './review.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
