import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const frontendUrl = config.get<string>('FRONTEND_URL');

  app.enableCors({
  origin: [
    // 'http://localhost:3000',
    frontendUrl         
  ],
  credentials: true,
});

  const port = config.get<number>('PORT') || 5000;

  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap();