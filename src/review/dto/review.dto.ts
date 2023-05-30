export class CreateReviewDto {
  course: string;
  author: string;
  rating: number;
  summary: string;
}

export class EditReviewDto {
  summary: string;
  rating: number;
}

export class GetByUserDto {
  course: string;
  user: string;
}
