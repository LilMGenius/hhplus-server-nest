import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appPort = process.env.PORT ?? 3000;

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Concert Ticketing API')
    .setVersion('0.2.2')
    .setDescription('Auto-generated API docs by Swagger for `Concert Ticketing Server`')
    .setContact('@LilMGenius', 'https://github.com/LilMGenius', 'smsmeee@naver.com')
    .addServer(`http://localhost:${appPort}`)
    .build();

  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(appPort, () => {
    console.log(`Server is running on http://localhost:${appPort}`);
  });
}
bootstrap();
