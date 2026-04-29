import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards,
  Req,
  ForbiddenException,} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';


@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  // ✅ CREATE doctor (admin only)
 
  @Post()
  create(@Body() body: any, @Req() req: any) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admin can add doctors');
    }

    return this.doctorService.create(body);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
}
