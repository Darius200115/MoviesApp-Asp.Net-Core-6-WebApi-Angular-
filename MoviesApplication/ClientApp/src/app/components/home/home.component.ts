import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { RecomendedMovieComponent } from '../recomended-movie/recomended-movie.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: MovieService) {}

  ngOnInit(): void {
    this.service.getRecomendedMovie().subscribe(() => {});
  }
}
