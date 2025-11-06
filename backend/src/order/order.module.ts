import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { Film, Schedule } from '../films/entities/film.entity';
import { FilmsRepository } from '../repository/film.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [OrderController],
  providers: [OrderService, FilmsRepository],
})
export class OrderModule {}
