import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { CustomerService } from 'src/customer/customer.service';
import Stripe from 'stripe';
import { PaymentBooksDto } from './dto/paymnet-books.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly customerService: CustomerService,
  ) {}

  async paymentBooks(body: PaymentBooksDto, userID: string) {
    const customer = await this.customerService.getCustomer(userID);
    const card = await this.customerService.atachPaymentMethod(body.paymentMethod, userID);

    const paymnetIntent = await this.stripeClient.paymentIntents.create({
      amount: body.price * 100,
      currency: 'usd',
      payment_method: card.id,
      customer: customer.id,
    });

    return paymnetIntent.client_secret;
  }
}
