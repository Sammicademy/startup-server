import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeModule } from 'nestjs-stripe';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    StripeModule.forRoot({ apiKey: process.env.STRIPE_SECRET_KEY, apiVersion: '2022-11-15' }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
