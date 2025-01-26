import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from 'src/schemas/reservation.schema';
import { FirebaseSeeder } from './firebase.seeder';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  providers: [FirebaseSeeder],
  exports: [FirebaseSeeder],
})
export class FirebaseModule {}
