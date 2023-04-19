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

  async deleteCourse(courseId: string) {
    await this.courseModel.findByIdAndRemove(courseId);
    return 'Success';
  }

  async activateCourse(courseId: string) {
    const course = await this.courseModel.findByIdAndUpdate(
      courseId,
      { $set: { isActive: true } },
      { new: true },
    );

    return course;
  }

  async draftCourse(courseId: string) {
    const course = await this.courseModel.findByIdAndUpdate(
      courseId,
      { $set: { isActive: false } },
      { new: true },
    );

    return course;
  }

  async dragCourseSections(courseId: string, sections: string[]) {
    const course = await this.courseModel
      .findByIdAndUpdate(courseId, { $set: { sections } }, { new: true })
      .populate({ path: 'sections', populate: { path: 'lessons' } });

    return course.sections;
  }

  async getCourses(language: string, limit: string) {
    const courses = await this.courseModel
      .find({ language })
      .populate('sections')
      .populate('author')
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .exec();

    return courses.map(course => this.getSpecificFieldCourse(course));
  }

  getSpecificFieldCourse(course: CourseDocument) {
    return {
      title: course.title,
      previewImage: course.previewImage,
      price: course.price,
      level: course.level,
      author: {
        fullName: course.author.fullName,
        avatar: course.author.avatar,
      },
      lessonCount: course.sections.map(c => c.lessons.length).reduce((a, b) => +a + +b, 0),
    };
  }
}
