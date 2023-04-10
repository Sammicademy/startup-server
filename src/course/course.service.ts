import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseBodyDto } from './coourse.dto';
import { Course, CourseDocument } from './course.model';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async createCourse(dto: CourseBodyDto, id: string) {
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const slug = slugify(dto.title);
    return await this.courseModel.create({ ...dto, slug: slug, author: id });
  }

  async editCourse(dto: CourseBodyDto, courseId: string) {
    return await this.courseModel.findByIdAndUpdate(courseId, dto, { new: true });
  }
}
