import { Injectable } from '@nestjs/common';

import { OrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  create(orderDto: OrderDTO) {
    return 'This action adds a new order';
  }
}
