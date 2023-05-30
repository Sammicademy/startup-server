import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { Review } from './review.model';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;

  const exec = { exec: jest.fn() };
  const reviewRepositoryFactory = () => {
    return {
      find: () => exec,
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { useFactory: reviewRepositoryFactory, provide: getModelToken(Review.name) },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('getReview working', async () => {
    const id = new Types.ObjectId().toHexString();
    reviewRepositoryFactory()
      .find()
      .exec.mockReturnValue([{ course: id }]);
    const res = await service.getReview(id);
    expect(res[0].course).toBe(id);
  });
});
