import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Actor } from '../shared/actor';
import { Movie } from '../shared/movie';

@Injectable()
export class ActorService {
  constructor(private http: HttpClient) {}

  public actors: Actor[] = [];

  loadActors(): Observable<void> {
    return this.http.get<[]>('/api/actor/GetActors').pipe(
      map((data) => {
        this.actors = data;
        return;
      })
    );
  }

  addActorToMovie(movieId: string, actorId: string) {
    return this.http
      .post<Movie>(`/api/movie/${movieId}/AddActor/${actorId}`, null)
      .subscribe(() => {});
  }

  loadMovieById(id: string): Observable<Actor> {
    return this.http
      .get<Actor>('/api/actor/' + id)
      .pipe(tap(() => console.log('Get actor whose id=${id}')));
  }
}
