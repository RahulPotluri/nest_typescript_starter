import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";
import { Roles } from "./roles.entity";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role : string;
  dateOfBirth?: Date;
  createDate?: Date;
  deletedAt?: Date;
  updatedDate?: Date;
}

@Schema()
export class User implements IUser {

  @IsString()
  @Prop({ required: true })
  public firstName: string;

  @IsString()
  @Prop({ required: true })
  public lastName: string;

  @IsEmail()
  @Prop({ required: true, unique: true })
  public email: string;

  @IsString()
  @Prop({ required: true })
  public password: string;

  @IsNumber()
  @Prop({ required: true, enum: ['ADMIN', 'USER'], default: 'USER' })
  role: string;

  // @IsNumber()
  // @Prop({ type: Types.ObjectId, required: true, ref: 'Roles' })
  // role: Roles;

  @IsDate()
  @Prop({ default: new Date(1900,1,1)})
  dateOfBirth?: Date;

  @IsDate()
  @Prop()
  deletedAt?: Date;

  @IsDate()
  @Prop({required: true, default: Date.now})
  createDate?: Date;

  @IsDate()
  @Prop({required: true, default: Date.now})
  updatedDate?: Date;

}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
