import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from './doctor.schema';
import { Model } from 'mongoose';
@Injectable()
export class DoctorService {

  constructor(
    @InjectModel(Doctor.name)
    private doctorModel: Model<Doctor>,
  ) {}

  async create(data: any) {
    return this.doctorModel.create(data);
  }

  async findAll() {
    return this.doctorModel.find();
  }

  async findOne(id: string) {
    return this.doctorModel.findById(id);
  }

}
