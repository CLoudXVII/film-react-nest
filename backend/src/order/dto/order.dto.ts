import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class TicketDTO {
  @IsUUID()
  @IsNotEmpty()
  film: string;
  @IsUUID()
  @IsNotEmpty()
  session: string;
  @IsNotEmpty()
  daytime: string;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  row: number;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  seat: number;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}

export class OrderDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  phone: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDTO)
  tickets: TicketDTO[];
}
