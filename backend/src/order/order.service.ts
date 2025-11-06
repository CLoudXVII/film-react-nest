import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { OrderDTO } from './dto/order.dto';
import { FilmsRepository } from '../repository/film.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async create(orderDto: OrderDTO) {
    const { tickets } = orderDto;

    const uniqueTickets = new Set<string>();
    for (const ticket of tickets) {
      const seatId = `${ticket.film}:${ticket.session}:${ticket.row}:${ticket.seat}`;
      if (uniqueTickets.has(seatId)) {
        throw new BadRequestException(
          `Обнаружен дубликат билета ${ticket.row}:${ticket.seat} в сессии ${ticket.session}`,
        );
      }
      uniqueTickets.add(seatId);
    }
    for (const ticket of tickets) {
      const film = await this.filmRepository.getSchedule(ticket.film);
      const session = film.find((session) => ticket.session === session.id);
      if (!session) {
        throw new NotFoundException(`Не найдена сессия с ID ${ticket.session}`);
      }
      const seat = `${ticket.row}:${ticket.seat}`;
      if (session.taken.includes(seat)) {
        throw new BadRequestException(`Сиденье ${seat} уже занято`);
      }
    }
    tickets.forEach((ticket) =>
      this.filmRepository.addTakenSeats(ticket.session, [
        `${ticket.row}:${ticket.seat}`,
      ]),
    );
    return { total: tickets.length, items: tickets };
  }
}
