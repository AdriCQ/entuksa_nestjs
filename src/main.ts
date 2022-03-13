import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieSession from 'cookie-session';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
/**
 *
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  // Protection
  app.use(compression());
  app.use(helmet());
  app.enableCors({ credentials: true, origin: true });
  app.use(cookieSession({
    name: 'session',
    keys: ['base64:8bcsoYPHql4JdllMYU99VAph73VUkIBjen7vU9LXuM4='],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));
  app.use(cookieParser());
  app.use(csurf());
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('EnTuKsa API')
    .setDescription('EnTuKsa API Rest')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
