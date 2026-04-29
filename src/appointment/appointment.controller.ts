import { Controller, Get, Post, Body, Patch, Param, Delete , Req, ForbiddenException } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

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
    userId: req.user.sub, 
  });
}

 @Get()
findAll(@Req() req: any) {
  return this.appointmentService.findAll(req.user);
}

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.appointmentService.findOne(id);
  }

}
