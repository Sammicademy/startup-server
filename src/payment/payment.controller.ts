import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PaymentBooksDto } from './dto/paymnet-books.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @HttpCode(200)
  @Post('books')
  @Auth('USER')
  paymentBooks(@Body() dto: PaymentBooksDto) {
    return this.paymentService.paymentBooks(dto.price);
  }
}
