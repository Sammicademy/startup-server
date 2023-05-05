import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { paymentBooksDto } from './dto/payment-books.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @HttpCode(200)
  @Post('books')
  paymentBooks(@Body() dto: paymentBooksDto) {
    return this.paymentService.paymentBooks(dto.price);
  }
}
