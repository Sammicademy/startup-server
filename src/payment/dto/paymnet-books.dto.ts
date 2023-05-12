export class PaymentBooksDto {
  price: number;
  paymentMethod: string;
}

export class PaymentcourseDto extends PaymentBooksDto {
  courseId: string;
}
