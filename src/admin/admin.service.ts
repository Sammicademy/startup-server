import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor, InstructorDocument } from 'src/instructor/instructor.model';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Instructor.name) private instructorModel: Model<InstructorDocument>) {}

  async getAllInstructors() {
    const approvedInstructor = await this.instructorModel
      .find({ approved: true })
      .populate('author')
      .exec();
    const appliedInstructor = await this.instructorModel
      .find({ approved: false })
      .populate('author')
      .exec();

    return {
      approved: approvedInstructor.map(instructor => this.getSpecificField(instructor)),
      applied: appliedInstructor.map(instructor => this.getSpecificField(instructor)),
    };
  }

  getSpecificField(instructor: InstructorDocument) {
    return {
      approved: instructor.approved,
      socialMedia: instructor.socialMedia,
      author: {
        fullName: instructor.author.fullName,
        email: instructor.author.email,
        job: instructor.author.job,
      },
    };
  }
}
