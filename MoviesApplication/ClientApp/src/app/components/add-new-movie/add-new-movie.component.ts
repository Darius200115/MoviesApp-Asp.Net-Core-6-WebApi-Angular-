import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import Director from 'src/app/shared/director';
import { Movie } from 'src/app/shared/movie';

@Component({
  selector: 'app-add-new-movie',
  templateUrl: './add-new-movie.component.html',
  styleUrls: ['./add-new-movie.component.css'],
})
export class AddNewMovieComponent {
  constructor(public service: MovieService, private router: Router) {}

  public movie: Movie = {
    id: '',
    title: '',
    description: '',
    isRecommended: false,
    releaseDate: new Date(),
    genres: '',
    runTime: '',
    ageRating: 0,
    movieUrl: '',
    trailerUrl: '',
    posterUrl: '',
    directors: [],
    actors: [],
    likes: 0,
    dislikes: 0,
  };
  errorMessage = '';

  onAdd() {
    this.errorMessage = '';
    this.service.postMovie(this.movie).subscribe({
      next: () => {
        this.router.navigate(['/']);
        alert('Movie added success');
      },
      error: (err: any) => {
        this.errorMessage = `Failed to adding new movie: ${err}`;
      },
    });
  }
}
