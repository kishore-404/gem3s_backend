import { Controller, Get, Post, Body, Patch, Param, Delete , Req, ForbiddenException } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post()
create(@Body() body: any, @Req() req: any) {
  if (req.user.role !== 'patient') {
    throw new ForbiddenException('Only patients can book');
  }

  return this.appointmentService.create({
    ...body,
    userId: req.user.sub, // 👈 VERY IMPORTANT
  });
}

 @Get()
findAll(@Req() req: any) {
  return this.appointmentService.findAll(req.user);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
