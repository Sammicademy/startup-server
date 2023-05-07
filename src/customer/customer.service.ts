import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectStripe } from 'nestjs-stripe';
import { User, UserDocument } from 'src/user/user.model';
import Stripe from 'stripe';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  async createCustomer(userID: string) {
    const user = await this.userModel.findById(userID);
    const { email } = user;

    const customer = await this.stripeClient.customers.create({
      email: email,
      metadata: {
        customerUID: userID,
      },
    });

    const updateUser = await this.userModel.findByIdAndUpdate(
      user._id,
      { $set: { customerId: customer.id } },
      { new: true },
    );

    updateUser.save();
    return customer;
  }

  async getCustomer(userID: string) {
    const user = await this.userModel.findById(userID);
    const { customerId } = user;

    if (!customerId) {
      return this.createCustomer(userID);
    }

    const customer = await this.stripeClient.customers.retrieve(customerId);
    return customer;
  }

  async atachPaymentMethod(paymentMethod: string, userID: string) {
    const customer = await this.getCustomer(userID);

    const atachedCard = await this.stripeClient.paymentMethods.attach(paymentMethod, {
      customer: customer.id,
    });

    return atachedCard;
  }

  async savedCustomerCard(customerId: string) {
    if (!customerId) throw new UnauthorizedException();

    const cards = await this.stripeClient.paymentMethods.list({
      customer: customerId,
      limit: 3,
      type: 'card',
    });

    return cards.data;
  }
}
