import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from 'src/course/course.model';
import { User, UserDocument } from 'src/user/user.model';
import { InstructorApplyDto } from './dto/instructor.dto';
import { Instructor, InstructorDocument } from './instructor.model';

@Injectable()
export class InstructorService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Instructor.name) private instructorModel: Model<InstructorDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async applyAsInstructor(dto: InstructorApplyDto) {
    const { email, firstName, lastName, socialMedia } = dto;
    let user: UserDocument;

    const existUser = await this.userModel.findOne({ email });
    user = existUser;

    if (!existUser) {
      const newUser = await this.userModel.create({ ...dto, fullName: `${firstName} ${lastName}` });
      user = newUser;
    }

    const data = { socialMedia, author: user._id };
    const existInstructor = await this.instructorModel.findOne({ author: user._id });

    if (existInstructor)
      throw new BadRequestException('Instructor with that email already exist in our system');

    await this.instructorModel.create(data);

    return 'Success';
  }

  async getAllCourses(author: string) {
    return await this.courseModel.find({ author });
  }

  async getDetailedCourse(slug: string) {
    return await this.courseModel.findOne({ slug });
  }
}
