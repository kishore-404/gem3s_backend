import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true })
  doctorId!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
userId!: string;

  @Prop({ required: true })
  patientName!: string;

  @Prop({ required: true })
  age!: number;

  @Prop()
  problem!: string;

  @Prop({ required: true })
  date!: string; 

  @Prop({ required: true })
  startTime!: string;

  @Prop({ required: true })
  endTime!: string; 

  @Prop({ default: 'Scheduled' })
  status!: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);