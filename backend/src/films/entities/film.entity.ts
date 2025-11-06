import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'float' })
  rating: number;
  @Column()
  director: string;
  @Column('simple-array')
  tags: string[];
  @Column()
  title: string;
  @Column()
  about: string;
  @Column()
  description: string;
  @Column()
  image: string;
  @Column()
  cover: string;
  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  daytime: string;
  @Column()
  hall: number;
  @Column()
  rows: number;
  @Column()
  seats: number;
  @Column({ type: 'float' })
  price: number;
  @Column('simple-array')
  taken: string[];
  @ManyToOne(() => Film, (film) => film.schedule)
  @JoinColumn({ name: 'film_id' })
  film: Film;
}
