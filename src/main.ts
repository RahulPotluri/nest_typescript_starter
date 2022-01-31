import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeSwagger(app);
  initializeMiddleware(app);

  await app.listen(3000);
}

function initializeMiddleware(app: INestApplication) {
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
}

function initializeSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Backend Api')
    .setDescription('Backend node boilerplate API')
    .setVersion('1.0')
    .addTag('backend')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

bootstrap();



