import { Controller, Get, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reservationService.findByDateRange(startDate, endDate);
  }

  /* @Get('reservations')
  get() {
    return this.reservationService.findAll();
  } */
}
