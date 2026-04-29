import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  specialization!: string;

  @Prop({ required: true })
  startTime!: string;

  @Prop({ required: true })
  endTime!: string;

  @Prop({ required: true })
  timeZone!: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);