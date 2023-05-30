import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto, EditReviewDto, GetByUserDto } from './dto/review.dto';
import { Review, ReviewDocument } from './review.model';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

  async createReview(dto: CreateReviewDto) {
    const review = await this.reviewModel.create(dto);

    return review._id;
  }

  async deleteReview(reviewId: string) {
    const isReview = await this.reviewModel.findById(reviewId);

    if (!isReview) throw new NotFoundException('Review with id not found');

    const review = await this.reviewModel.findByIdAndRemove(reviewId);

    return review._id;
  }

  async editReview(reviewId: string, dto: EditReviewDto) {
    console.log(reviewId);

    const review = await this.reviewModel.findByIdAndUpdate(
      reviewId,
      {
        $set: { rating: dto.rating, summary: dto.summary },
      },
      { new: true },
    );

    return review._id;
  }

  async getReview(courseId: string) {
    const reviews = await this.reviewModel.find({ course: courseId }).populate('author').exec();

    return reviews;
  }

  async getByUser({ course, user }: GetByUserDto) {
    const reviews = await this.reviewModel.find({ course }).exec();
    const isExist = reviews.find(c => String(c.author) === user);

    return isExist;
  }
}
