import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendedMovieComponent } from './recomended-movie.component';

describe('RecomendedMovieComponent', () => {
  let component: RecomendedMovieComponent;
  let fixture: ComponentFixture<RecomendedMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendedMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomendedMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
