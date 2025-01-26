import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from '../schemas/reservation.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}

  /* async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  } */

  async findByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<Reservation[]> {
    return this.reservationModel
      .find({
        date: { $gte: startDate, $lte: endDate },
      })
      .exec();
  }
}
