import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);

  const existingAdmin = await usersService.findByEmail('admin@test.com');

  if (!existingAdmin) {
    await usersService.create({
      name: 'kishore',
      email: 'kishore@gem3s.com',
      password: '123456',
      role: 'admin',
    });

    console.log('✅ Admin created');
  } else {
    console.log('⚠️ Admin already exists');
  }

  await app.close();
}

bootstrap();