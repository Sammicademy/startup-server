import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/course/course.model';
import { SectionController } from './section.controller';
import { Section, SectionSchema } from './section.model';
import { SectionService } from './section.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Section.name, schema: SectionSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
