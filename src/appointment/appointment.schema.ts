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
  date!: string; // "2026-05-01"

  @Prop({ required: true })
  startTime!: string; // "10:00"

  @Prop({ required: true })
  endTime!: string; // "10:30"

  @Prop({ default: 'Scheduled' })
  status!: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);