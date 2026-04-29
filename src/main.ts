import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 5000;

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();