import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards,
  Req,
  ForbiddenException,} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }
 
 @UseGuards(JwtAuthGuard, RolesGuard)
@Post()
@Roles('admin')
create(@Body() body: any) {
  return this.doctorService.create(body);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }
}
