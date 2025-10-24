import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { FilmsRepository } from '../repository/film.repository';
import { Film, FilmSchema } from '../films/schemas/film.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, FilmsRepository],
})
export class OrderModule {}
