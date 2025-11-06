import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { FilmDTO, ScheduleDTO } from '../films/dto/films.dto';
import { Film, Schedule } from '../films/schemas/film.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

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
    const films = await this.filmModel.find().exec();
    return films.map((film) => this.mapFilmDTO(film));
  }

  async getSchedule(id: string): Promise<ScheduleDTO[]> {
    const film = await this.filmModel.findOne({ id: id }).exec();
    if (!film) {
      throw new NotFoundException(`Не найдено раcписание на фильм с ID ${id}`);
    }
    return film.schedule.map((schedule) => this.mapScheduleDTO(schedule));
  }

  async addTakenSeats(
    filmID: string,
    sessionID,
    seats: string[],
  ): Promise<UpdateWriteOpResult> {
    return await this.filmModel.updateOne(
      { id: filmID, 'schedule.id': sessionID },
      { $push: { 'schedule.$.taken': { $each: seats } } },
    );
  }
}
