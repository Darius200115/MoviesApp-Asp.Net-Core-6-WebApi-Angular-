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
    minItems: 5,
    loop: true,
    autoWidth: true,
    margin: 10,
    nav: true,
    dots: false,

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
