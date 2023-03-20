import { Movie } from './movie';

export class Actor {
  id!: string;
  name!: string;
  secondName!: string;
  birthday!: Date | null;
  country!: string | null;
  dayOfDeath!: Date | null;
  movies!: Movie[] | null;
}
