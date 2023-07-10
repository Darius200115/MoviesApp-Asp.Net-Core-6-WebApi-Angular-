import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Actor } from '../shared/actor';
import { Movie } from '../shared/movie';

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) {}

  public movies: Movie[] = [];
  public recomendedMovie: Movie[] = [];
  public currentYearMovie: Movie[] = [];
  public newMovie: Movie = new Movie();

  private _movie$: BehaviorSubject<Movie> = new BehaviorSubject(new Movie());
  public movie$: Observable<Movie> = this._movie$.asObservable();

  loadMovies(): Observable<void> {
    return this.http.get<[]>('/api/movie/GetMovies').pipe(
      map((data) => {
        this.movies = data;
        return;
      })
    );
  }

  loadMovieById(id: string): Observable<Movie> {
    return this.http.get<any>('/api/movie/' + id).pipe(
      tap((data) => {
        this._movie$.next(data);
        console.log('Get movie id=${id}');
      })
    );
  }

  postMovie(movie: Movie) {
    return this.http.post<Movie>('/api/movie/PostMovie', movie).pipe(
      map(() => {
        this.newMovie = new Movie();
      })
    );
  }

  removeMovie(id: string): Observable<Movie> {
    return this.http.delete<Movie>('/api/movie/' + id);
  }

  getRecomendedMovie(): Observable<void> {
    return this.http.get<[]>('/api/movie/recommended').pipe(
      map((data) => {
        this.recomendedMovie = data;
        return;
      })
    );
  }

  getCurrentYearMovies(): Observable<void> {
    return this.http.get<[]>('/api/movie/thisYear').pipe(
      map((data) => {
        this.currentYearMovie = data;
        return;
      })
    );
  }

  IncrementLikes(id: string, IsLike: boolean) {
    return this.http.put<any>(`/api/movie/${id}/score/${IsLike}`, null);
  }

}
