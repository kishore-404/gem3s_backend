import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

   @Post('login')
   @Public()
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  @Public()
register(@Body() body: any) {
  return this.authService.register(body);
}

}
