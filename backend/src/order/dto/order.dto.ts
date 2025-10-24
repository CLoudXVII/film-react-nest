import { UUID } from "node:crypto";

export class OrderDTO {
  id: UUID;
  film: UUID;
  session: UUID;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}
