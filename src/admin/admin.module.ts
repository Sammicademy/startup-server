import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeModule } from 'nestjs-stripe';
import { Course, CourseSchema } from 'src/course/course.model';
import { Instructor, InstructorSchema } from 'src/instructor/instructor.model';
import { User, UserSchema } from 'src/user/user.model';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Instructor.name, schema: InstructorSchema },
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
    StripeModule.forRoot({ apiKey: process.env.STRIPE_SECRET_KEY, apiVersion: '2022-11-15' }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
