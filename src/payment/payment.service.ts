import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectStripe } from 'nestjs-stripe';
import { Course, CourseDocument } from 'src/course/course.model';
import { CustomerService } from 'src/customer/customer.service';
import Stripe from 'stripe';
import { PaymentBooksDto, PaymentcourseDto } from './dto/paymnet-books.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly customerService: CustomerService,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
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

  async paymentCourse(body: PaymentcourseDto, userID: string) {
    const customer = await this.customerService.getCustomer(userID);
    const card = await this.customerService.atachPaymentMethod(body.paymentMethod, userID);
    const course = await this.courseModel.findById(body.courseId).populate('author');

    const paymnetIntent = await this.stripeClient.paymentIntents.create({
      amount: body.price * 100,
      currency: 'usd',
      payment_method: card.id,
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
      application_fee_amount: 123,
      transfer_data: {
        destination: course.author.instructorAccount,
      },
    });

    return paymnetIntent.client_secret;
  }
}
