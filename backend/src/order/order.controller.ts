import { Controller, Post, Body } from '@nestjs/common';

import { OrderDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() orderDTO: OrderDTO) {
    return this.orderService.create(orderDTO);
  }
}
