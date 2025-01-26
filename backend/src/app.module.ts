import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.modele';
import { FirebaseSeeder } from './seeder/firebase.seeder';
import { ReservationModule } from './rerservation/reservation.module';
import { FirebaseModule } from './seeder/firebase.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    ReservationModule,
    UserModule,
    FirebaseModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly firebaseSeeder: FirebaseSeeder) {}

  async onModuleInit() {
    await this.firebaseSeeder.getSeeds();
  }
}
