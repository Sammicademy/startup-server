import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { PaymentBooksDto, PaymentcourseDto } from './dto/paymnet-books.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @HttpCode(200)
  @Post('books')
  @Auth('USER')
  paymentBooks(@Body() dto: PaymentBooksDto, @User('_id') _id: string) {
    return this.paymentService.paymentBooks(dto, _id);
  }

  @HttpCode(200)
  @Post('course')
  @Auth('USER')
  paymentCourse(@Body() dto: PaymentcourseDto, @User('_id') _id: string) {
    return this.paymentService.paymentCourse(dto, _id);
  }
}
