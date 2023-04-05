import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.model';
import { InstructorController } from './instructor.controller';
import { Instructor, InstructorSchema } from './instructor.model';
import { InstructorService } from './instructor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Instructor.name, schema: InstructorSchema },
    ]),
  ],
  providers: [InstructorService],
  controllers: [InstructorController],
})
export class InstructorModule {}
