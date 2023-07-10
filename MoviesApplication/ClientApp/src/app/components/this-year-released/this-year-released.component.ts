import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-this-year-released',
  templateUrl: './this-year-released.component.html',
  styleUrls: ['./this-year-released.component.css'],
})
export class ThisYearReleasedComponent implements OnInit {
  constructor(public service: MovieService) {}

  carouselOptions = {
    autoplay: true,
    slideTransition: 'linear',
    autoplaySpeed: 1000,
    minItems: 5,
    loop: true,
    margin: 10,
    interval: 100,
    smartSpeed: 500,
    nav: false,
    autoplayMouseleaveTimeout: 1,
    dots: true,
    responsive: {
      0: {
        items: 1,
        autoWidth: false,
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

  ngOnInit(): void {
    this.service.getCurrentYearMovies().subscribe(() => {});
  }
}
