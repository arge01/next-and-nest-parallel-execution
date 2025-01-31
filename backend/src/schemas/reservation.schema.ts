import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reservation extends Document {
  @Prop({ required: true })
  flightNumber: string;

  @Prop({ required: true })
  departure: string;

  @Prop({ required: true })
  arrival: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: [Object], required: true })
  guests: {
    name: string;
    age: number;
    seatNo: string;
    phone: string;
    address: string;
  }[];
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
