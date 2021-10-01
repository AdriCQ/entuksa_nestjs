import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import { ValidationPipe } from '@nestjs/common';
/**
 *
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // Protection
  app.use(compression());
  app.use(helmet());
  // app.use(csurf());

  await app.listen(3000);
}
bootstrap();
