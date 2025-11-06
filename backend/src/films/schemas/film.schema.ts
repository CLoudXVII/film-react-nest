import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Schedule {
  @Prop({ type: String, required: true })
  id: string;
  @Prop({ type: Date, required: true })
  daytime: Date;
  @Prop({ type: Number, required: true })
  hall: number;
  @Prop({ type: Number, required: true })
  rows: number;
  @Prop({ type: Number, required: true })
  seats: number;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: [String], required: true })
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema()
export class Film {
  @Prop({ type: String, required: true, unique: true })
  id: string;
  @Prop({ type: Number, required: true })
  rating: number;
  @Prop({ type: String, required: true })
  director: string;
  @Prop({ type: [String], required: true })
  tags: string[];
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  about: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: String, required: true })
  image: string;
  @Prop({ type: String, required: true })
  cover: string;
  @Prop({ type: [ScheduleSchema], required: true })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
