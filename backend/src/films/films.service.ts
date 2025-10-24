import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsService {
  findAll() {
    return `This action returns all films`;
  }

  getSchedule(id: number) {
    return `This action returns a film by id: ${id}`;
  }
}
