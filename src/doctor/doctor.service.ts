import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from './doctor.schema';
import { Model } from 'mongoose';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class DoctorService {

  constructor(
    @InjectModel(Doctor.name)
    private doctorModel: Model<Doctor>,
  ) {this.doctorModel.syncIndexes();}

  async create(data: any) {
  try {
    return await this.doctorModel.create(data);
  } catch (error:any) {
    if (error.code === 11000) {
      throw new ConflictException('Email already exists');
    }
    throw error;
  }
}

  async findAll() {
    return this.doctorModel.find();
  }

  async findOne(id: string) {
    return this.doctorModel.findById(id);
  }

}
