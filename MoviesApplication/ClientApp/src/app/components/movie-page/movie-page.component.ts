import { Component, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/shared/movie';
import { Youtube } from 'src/app/safe.pipe';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MovieDialogComponent } from './movie-dialog/movie-dialog.component';
import { ActorsDialogComponent } from './actors-dialog/actors-dialog.component';
import { ActorService } from 'src/app/services/actor.service';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css'],
})
export class MoviePageComponent implements OnInit {
  baseUrl = 'https://www.youtube.com/embed/';
  properties = '?controls=0';
  public safeUrl!: SafeResourceUrl | null;
  public errorMessage = '';
  url: string;

  public movie$: Observable<Movie> = this.movieService.movie$!;
  public movieid: string;
  // public movieSub!: Movie;

  public isLike: boolean = true;

  constructor(
    private movieService: MovieService,
    private actorService: ActorService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private authService: AccountService
  ) {}

  ngOnInit() {
    const MovieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.movieid = MovieId!;
    this.movieService.loadMovieById(MovieId!).subscribe({
      next: (data) => {
        this.url = data.trailerUrl;
      },
    });
    this.movieService.movie$.subscribe(() => {});
    // this.movie$.subscribe((data) => {
    //   this.movie = data;
    //   this.url = data.trailerUrl!;
    // });

    // this.movieService.loadMovieById(MovieId!).subscribe((m) => {
    //   this.movie$ = m;
    //   this.url = m.trailerUrl!;
    // });
  }

  remove(id: string) {
    this.movieService.removeMovie(id).subscribe({
      next: () => {
        this.router.navigate(['/']);
        alert('Movie deleted success');
      },
      error: (err: any) => {
        this.errorMessage = `Failed to remove movie: ${err}`;
      },
    });
  }

  onLike(id: string) {
    const user = this.authService.getUserEmail();
    this.movieService.IncrementLikes(id, this.isLike).subscribe({
      next: () => {},
      error: (err: any) => {
        console.log('Failed to like movie');
      },
    });
  }

  onDislike(id: string) {
    this.movieService.IncrementLikes(id, this.isLike).subscribe({
      next: () => {},
      error: (err: any) => {
        console.log('Failed to like movie');
      },
    });
  }

  changeIsLike(value: boolean) {
    this.isLike = value;
  }
  removeActor(movieId: string, actorId: string) {
    this.actorService.removeActorFromMovie(movieId, actorId).subscribe({
      next: () => {
        location.reload();
        console.log(movieId, actorId);
      },
    });
  }

  openActorDialog(): void {
    const dialogRef = this.dialog.open(ActorsDialogComponent, {
      width: '250px',
      data: { movieId: this.movieid },
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openDialogMovie(_url: string) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.baseUrl + _url
    );
    console.log('Url:' + _url);
    console.log('SafeUrl : ' + this.safeUrl);
    this.dialog.open(MovieDialogComponent, {
      height: '512px',
      width: '900px',
      data: { safe: this.safeUrl },
    });
  }
}
