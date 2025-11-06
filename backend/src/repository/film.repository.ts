import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { FilmDTO, ScheduleDTO } from 'src/films/dto/films.dto';
import { Film, Schedule } from 'src/films/entities/film.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly film: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly schedule: Repository<Schedule>,
  ) {}

  private mapFilmDTO(film: Film): FilmDTO {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      title: film.title,
      about: film.about,
      description: film.description,
      image: film.image,
      cover: film.cover,
      schedule: film.schedule,
    };
  }

  private mapScheduleDTO(schedule: Schedule): ScheduleDTO {
    return {
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    };
  }

  async findAll(): Promise<FilmDTO[]> {
    const films = await this.film.find({ relations: { schedule: true } });
    return films.map((film) => this.mapFilmDTO(film));
  }

  async getSchedule(id: string): Promise<ScheduleDTO[]> {
    const film = await this.film.findOne({
      where: { id },
      relations: { schedule: true },
    });
    if (!film) {
      throw new NotFoundException(`Не найдено раcписание на фильм с ID ${id}`);
    }
    return film.schedule.map((schedule) => this.mapScheduleDTO(schedule));
  }

  async addTakenSeats(sessionID, seats: string[]) {
    const schedule = await this.schedule.findOneBy({ id: sessionID });
    if (!schedule) {
      throw new NotFoundException(`Не найдено раcписание с ID ${sessionID}`);
    }
    schedule.taken = [...schedule.taken, ...seats];
    return await this.schedule.save(schedule);
  }
}
