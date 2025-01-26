import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from 'src/schemas/reservation.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class FirebaseSeeder {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}

  async getSeeds() {
    console.log('Clearing old data...');

    await this.reservationModel.deleteMany({});
    await this.userModel.deleteMany({});

    await this.seedReservation();
    await this.seedUsers();
  }

  private async seedUsers() {
    console.log('Seeding user data...');

    const users = [
      {
        username: 'admin',
        password: 'adminPassword',
        role: 'admin',
      },
      {
        username: 'staff',
        password: 'staffPassword',
        role: 'staff',
      },
    ];

    for (const user of users) {
      await this.userModel.create(user);
    }

    console.log('Mock user data successfully created in MongoDB!');
  }

  private async seedReservation() {
    console.log('Seeding reservations data...');

    const mockReservations = Array.from({ length: 1000 }, (_, index) => ({
      flightNumber: `FL-${index + 1}`,
      departure: 'City A',
      arrival: 'City B',
      date: new Date(Date.now() + index * 86400000).toISOString(),
      guests: Array.from(
        { length: Math.floor(Math.random() * 30) + 1 },
        () => ({
          name: `${faker.person.fullName()}`,
          age: Math.floor(Math.random() * 50) + 18,
          seatNo: `${Math.random() < 0.5 ? 'A' : 'B'}-${Math.floor(Math.random() * 30)}`,
          phone: faker.phone.number(),
          address: `${faker.location.country()} / ${faker.location.city()}`,
        }),
      ),
    }));

    for (const reservation of mockReservations) {
      await this.reservationModel.create(reservation);
    }

    console.log('Mock data successfully created in MongoDB!');
  }
}
