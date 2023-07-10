import Director from './director';
import { Actor } from './actor';

export class Movie {
  id!: string;
  title!: string;
  description!: string | null;
  isRecommended!: boolean | null;
  releaseDate!: Date | null;
  genres!: string | null;
  runTime!: string | null;
  ageRating!: number | null;
  movieUrl!: string | null;
  trailerUrl!: string | null;
  posterUrl!: string | null;
  directors!: Director[] | null;
  actors!: Actor[] | null;
  likes!: number;
  dislikes: number;
}
