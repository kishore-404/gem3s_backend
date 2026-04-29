import { Injectable , BadRequestException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './appointment.schema';
import { Doctor } from '../doctor/doctor.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppointmentService {
   constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<Appointment>,

    @InjectModel(Doctor.name)
    private doctorModel: Model<Doctor>,
  ) {}

   async create(data: any) {
    const { doctorId, date, startTime, endTime } = data;

    // 🔍 1. Check doctor exists
    const doctor = await this.doctorModel.findById(doctorId);
    if (!doctor) {
      throw new BadRequestException('Doctor not found');
    }

    // ⏱️ 2. Check working hours
    if (startTime < doctor.startTime || endTime > doctor.endTime) {
      throw new BadRequestException('Outside doctor working hours');
    }

    // 🚫 3. Check overlapping
    const conflict = await this.appointmentModel.findOne({
      doctorId,
      date,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime },
        },
      ],
    });

    if (conflict) {
      throw new BadRequestException('Time slot already booked');
    }

    return this.appointmentModel.create(data);
  }

  async findAll(user:any) {
    
    if (user.role === 'admin') {
    return this.appointmentModel
      .find()
      .populate('doctorId', 'name specialization');
  }

    return this.appointmentModel
     .find({ userId: user.sub })
      .populate('doctorId', 'name specialization');
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}

