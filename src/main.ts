import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/interfaces/http/filters/http-exception.filter';
import { AuthenticationGuard } from 'src/interfaces/http/guards/authentication.guard';
import { LoggerService } from 'src/interfaces/http/middlewares/logger/logger.service';
import { LoggerMiddleware } from 'src/interfaces/http/middlewares/logger/logger.middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appPort = process.env.PORT ?? 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new AuthenticationGuard());

  const logger = app.get(LoggerService);
  const loggerMiddleware = new LoggerMiddleware(logger);
  app.use((req, res, next) => loggerMiddleware.use(req, res, next));

  const config = new DocumentBuilder()
    .setTitle('Concert Ticketing API')
    .setVersion('0.2.3')
    .setDescription('Auto-generated API docs by Swagger for `Concert Ticketing Server`')
    .setContact('@LilMGenius', 'https://github.com/LilMGenius', 'smsmeee@naver.com')
    .addServer(`http://localhost:${appPort}`)
    .build();

  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(appPort, () => {
    logger.info(`Server is running on http://localhost:${appPort}`);
  });
}
bootstrap();
