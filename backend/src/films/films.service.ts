import { Injectable } from '@nestjs/common';

import { FilmsRepository } from '../repository/film.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async findAll() {
    const films = await this.filmRepository.findAll();
    return { total: films.length, items: films };
  }

  async getSchedule(id: string) {
    const schedules = await this.filmRepository.getSchedule(id);
    return { total: schedules.length, items: schedules };
  }
}
