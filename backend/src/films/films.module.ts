import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film, Schedule } from './entities/film.entity';
import { FilmsRepository } from '../repository/film.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
})
export class FilmsModule {}
