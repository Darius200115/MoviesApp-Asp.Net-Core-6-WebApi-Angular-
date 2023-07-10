import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  constructor(public service: MovieService) {}

  page: number = 1;

  ngOnInit(): void {
    this.service.loadMovies().subscribe(() => {});
    
  }
}
