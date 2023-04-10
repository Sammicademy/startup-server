import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/course/course.model';
import { User, UserSchema } from 'src/user/user.model';
import { InstructorController } from './instructor.controller';
import { Instructor, InstructorSchema } from './instructor.model';
import { InstructorService } from './instructor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Instructor.name, schema: InstructorSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  providers: [InstructorService],
  controllers: [InstructorController],
})
export class InstructorModule {}
