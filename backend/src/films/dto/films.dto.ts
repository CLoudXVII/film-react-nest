import { UUID } from 'node:crypto';

export class FilmDTO {
  id: UUID;
  rating?: number;
  director?: string;
  tags?: string[];
  title?: string;
  about?: string;
  description?: string;
  image?: string;
  cover?: string;
}
