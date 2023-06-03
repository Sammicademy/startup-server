import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor, InstructorDocument } from 'src/instructor/instructor.model';
import { User, UserDocument } from 'src/user/user.model';
import { CourseBodyDto } from './coourse.dto';
import { Course, CourseDocument } from './course.model';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Instructor.name) private instructorModel: Model<InstructorDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createCourse(dto: CourseBodyDto, id: string) {
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const slug = slugify(dto.title);
    const course = await this.courseModel.create({ ...dto, slug: slug, author: id });
    await this.instructorModel.findOneAndUpdate(
      { author: id },
      { $push: { courses: course._id } },
      { new: true },
    );
    return 'Success';
  }

  async editCourse(dto: CourseBodyDto, courseId: string) {
    return await this.courseModel.findByIdAndUpdate(courseId, dto, { new: true });
  }

  async deleteCourse(courseId: string, userId: string) {
    await this.courseModel.findByIdAndRemove(courseId);
    await this.instructorModel.findOneAndUpdate(
      { author: userId },
      { $pull: { courses: courseId } },
      { new: true },
    );
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
    const courses = (await this.courseModel
      .aggregate([
        {
          $match: { language },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'author',
          },
        },
        {
          $lookup: {
            from: 'sections',
            localField: 'sections',
            foreignField: '_id',
            as: 'sections',
          },
        },
        {
          $lookup: {
            from: 'lessons',
            localField: 'sections.lessons',
            foreignField: '_id',
            as: 'lessons',
          },
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'course',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reivewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
          },
        },
        {
          $unwind: '$author',
        },
        {
          $project: {
            _id: 1,
            author: 1,
            sections: {
              $map: {
                input: '$sections',
                as: 'section',
                in: {
                  _id: '$$section._id',
                  title: '$$section.title',
                  lessons: {
                    $map: {
                      input: '$lessons',
                      as: 'lesson',
                      in: {
                        _id: '$$lesson._id',
                        name: '$$lesson.name',
                        minute: '$$lesson.minute',
                        second: '$$lesson.second',
                        hour: '$$lesson.hour',
                      },
                    },
                  },
                },
              },
            },
            slug: 1,
            isActive: 1,
            learn: 1,
            requirements: 1,
            tags: 1,
            description: 1,
            level: 1,
            category: 1,
            price: 1,
            previewImage: 1,
            title: 1,
            exerpt: 1,
            language: 1,
            updatedAt: 1,
            reivewCount: 1,
            reviewAvg: 1,
          },
        },
      ])
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .exec()) as (CourseDocument & { reivewCount: number; reviewAvg: number })[];

    return courses.map(course => this.getSpecificFieldCourse(course));
  }

  async getDetailedCourse(slug: string) {
    const course = (await this.courseModel
      .findOne({ slug })
      .populate({ path: 'sections', populate: { path: 'lessons' } })
      .populate('author')
      .exec()) as CourseDocument & { reivewCount: number; reviewAvg: number };

    return this.getSpecificFieldCourse(course);
  }

  getSpecificFieldCourse(course: CourseDocument & { reivewCount: number; reviewAvg: number }) {
    return {
      title: course.title,
      previewImage: course.previewImage,
      price: course.price,
      level: course.level,
      category: course.category,
      _id: course._id,
      author: {
        fullName: course.author.fullName,
        avatar: course.author.avatar,
        job: course.author.job,
      },
      lessonCount: course.sections.map(c => c.lessons.length).reduce((a, b) => +a + +b, 0),
      totalHour: this.getTotalHours(course),
      updatedAt: course.updatedAt,
      learn: course.learn,
      requirements: course.requirements,
      description: course.description,
      language: course.language,
      exerpt: course.exerpt,
      slug: course.slug,
      reivewCount: course.reivewCount,
      reviewAvg: course.reviewAvg,
    };
  }

  getTotalHours(course: CourseDocument) {
    let totalHour = 0;

    for (let s = 0; s < course.sections.length; s++) {
      const section = course.sections[s];
      let sectionHour = 0;

      for (let l = 0; l < section.lessons.length; l++) {
        const lesson = section.lessons[l];
        const hours = parseInt(String(lesson.hour));
        const seconds = parseInt(String(lesson.second));
        const minutes = parseInt(String(lesson.minute));
        const totalMinutes = hours * 60 + minutes;
        const totalSeconds = totalMinutes * 60 + seconds;
        const totalHourLesson = totalSeconds / 3600;
        sectionHour += totalHourLesson;
      }

      totalHour += sectionHour;
    }

    return totalHour.toFixed(1);
  }

  async getAdminCourses() {
    return this.courseModel.find().exec();
  }

  async enrollUser(userID: string, courseId: string) {
    await this.userModel.findByIdAndUpdate(userID, { $push: { courses: courseId } }, { new: true });

    return 'Success';
  }
}
