import { Movie } from './movie';

export default class Director {
  id!: string;
  firstName!: string;
  secondName!: string;
  birthday!: Date | null;
  countryOfBirth!: string | null;
  photoUrl!: string | null;
  movies!: Movie[] | null;
}
