import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from 'src/course/course.model';
import { Instructor, InstructorDocument } from 'src/instructor/instructor.model';
import { User, UserDocument } from 'src/user/user.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Instructor.name) private instructorModel: Model<InstructorDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async getAllInstructors() {
    const instructors = await this.instructorModel.find().populate('author').exec();

    return instructors.map(instructor => this.getSpecificField(instructor));
  }

  async aproveInstructor(instructorId: string) {
    const instructor = await this.instructorModel.findByIdAndUpdate(
      instructorId,
      {
        $set: { approved: true },
      },
      { new: true },
    );

    await this.userModel.findByIdAndUpdate(
      instructor.author,
      { $set: { role: 'INSTRUCTOR' } },
      { new: true },
    );

    return 'Success';
  }

  async deleteIntructor(instructorId: string) {
    const instructor = await this.instructorModel.findByIdAndUpdate(
      instructorId,
      {
        $set: { approved: false },
      },
      { new: true },
    );

    await this.userModel.findByIdAndUpdate(
      instructor.author,
      { $set: { role: 'USER' } },
      { new: true },
    );

    return 'Success';
  }

  async getAllUsers(limit: number) {
    const users = await this.userModel.find().limit(limit).sort({ createdAt: -1 }).exec();

    return users.map(user => this.getUserSpecificFiled(user));
  }

  async searchUser(email: string, limit: number) {
    let users: UserDocument[];
    if (email) {
      users = await this.userModel.find({}).exec();
    } else {
      users = await this.userModel.find({}).limit(limit).exec();
    }
    const searchedUser = users.filter(
      user => user.email.toLowerCase().indexOf(email.toLowerCase()) !== -1,
    );

    return searchedUser.map(user => this.getUserSpecificFiled(user));
  }

  async deleteCourse(courseId: string) {
    const courseAuthor = await this.courseModel.findById(courseId);
    await this.instructorModel.findOneAndUpdate(
      { author: courseAuthor.author },
      { $pull: { courses: courseId } },
      { new: true },
    );
    await this.courseModel.findByIdAndRemove(courseId, { new: true }).exec();
    const courses = await this.courseModel.find().exec();
    return courses.map(course => this.getSpecificFieldCourse(course));
  }

  getSpecificField(instructor: InstructorDocument) {
    return {
      approved: instructor.approved,
      socialMedia: instructor.socialMedia,
      _id: instructor._id,
      author: {
        fullName: instructor.author.fullName,
        email: instructor.author.email,
        job: instructor.author.job,
      },
    };
  }

  getUserSpecificFiled(user: UserDocument) {
    return {
      email: user.email,
      fullName: user.fullName,
      _id: user._id,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  getSpecificFieldCourse(course: CourseDocument) {
    return {
      title: course.title,
      previewImage: course.previewImage,
      price: course.price,
      isActive: course.isActive,
      language: course.language,
      _id: course._id,
    };
  }
}
