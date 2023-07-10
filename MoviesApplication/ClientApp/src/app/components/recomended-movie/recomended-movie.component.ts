import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/shared/movie';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'recommended',
  templateUrl: './recomended-movie.component.html',
  styleUrls: ['./recomended-movie.component.css'],
})
export class RecomendedMovieComponent implements OnInit {
  movies: Movie[];
  customOptions: OwlOptions;

  carouselOptions = {
    autoplay: true,
    slideTransition: 'linear',
    minItems: 5,
    loop: true,
    autoWidth: true,
    margin: 10,
    smartSpeed: 5000,
    autoplaySpeed: 5000,
    autoplayTimeout: 5500,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
    },
  };

  constructor(public service: MovieService) {}

  ngOnInit(): void {
    this.service.getRecomendedMovie().subscribe((data) => {});
  }
}
