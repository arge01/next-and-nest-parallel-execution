/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-require-imports */
import * as admin from 'firebase-admin';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert(require('../firebase-adminsdk.json')),
  });

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(8000);
  console.log('Backend running on http://localhost:8000');
}
bootstrap();
