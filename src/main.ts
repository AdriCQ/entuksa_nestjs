import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
  app.enableCors();
  // app.use(csurf());
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
