import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async paymentBooks(price: number) {
    const paymnetIntent = await this.stripeClient.paymentIntents.create({
      amount: price * 100,
      currency: 'usd',
    });

    return paymnetIntent.client_secret;
  }
}
