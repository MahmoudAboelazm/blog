import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 4000);
  console.log('\x1b[32m', `Server is running on ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.log(err);
});
