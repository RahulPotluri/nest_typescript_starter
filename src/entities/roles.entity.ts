import { Prop, Schema } from "@nestjs/mongoose";
import { IsDate, IsEmail, IsNumber, IsString } from "class-validator";

export interface IRoles{
  roleName: string;
  modules: [string];
}

@Schema()
export class Roles implements IRoles {

  @IsString()
  @Prop({ required: true })
  public roleName: string;

  @IsString()
  @Prop()
  public modules: [string];
}
