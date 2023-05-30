import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { disconnect, Types } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto, EditReviewDto } from '../src/review/dto/review.dto';

const courseId = new Types.ObjectId().toHexString();

const reviewDto: CreateReviewDto = {
  author: new Types.ObjectId().toHexString(),
  course: courseId,
  rating: 5,
  summary: 'Cool',
};

const editReviewDto: EditReviewDto = {
  rating: 3,
  summary: 'Good',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdReviewId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(reviewDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdReviewId = body;
        expect(createdReviewId).toBeDefined();
      });
  });

  it('/review/edit/:reviewId (EDIT)', async () => {
    return request(app.getHttpServer())
      .put('/review/edit/' + createdReviewId)
      .send(editReviewDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });

  it('/review/get/:courseId (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/review/get/' + courseId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });

  it('/review/get/:courseId (GET) - failed', async () => {
    return request(app.getHttpServer())
      .get('/review/get/' + new Types.ObjectId().toHexString())
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0);
      });
  });

  it('/review/delete/:reviewId (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/review/delete/' + createdReviewId)
      .expect(200);
  });

  it('/review/delete/:reviewId (DELETE) - failed', () => {
    return request(app.getHttpServer())
      .delete('/review/delete/' + new Types.ObjectId().toHexString())
      .expect(404, {
        statusCode: 404,
        message: 'Review with id not found',
        error: 'Not Found',
      });
  });

  afterAll(() => {
    app.close();
    disconnect();
  });
});
