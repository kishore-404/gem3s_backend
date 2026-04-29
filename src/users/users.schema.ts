import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type Role = 'admin' | 'patient';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ enum: ['admin', 'patient'], default: 'patient' })
  role!: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);