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

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css'],
})
export class MoviePageComponent implements OnInit {
  public movie: Movie = new Movie();
  baseUrl = 'https://www.youtube.com/embed/';
  properties = '?controls=0';
  public safeUrl!: SafeResourceUrl | null;
  public errorMessage = '';
  url: string;

  constructor(
    private service: MovieService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    let MovieId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.loadMovieById(MovieId!).subscribe((m) => {
      this.movie = m;
      this.url = m.trailerUrl!;
    });
  }

  remove(id: string) {
    this.service.removeMovie(id).subscribe({
      next: () => {
        this.router.navigate(['/']);
        alert('Movie deleted success');
      },
      error: (err: any) => {
        this.errorMessage = `Failed to remove movie: ${err}`;
      },
    });
  }

  openActorDialog(): void {
    const dialogRef = this.dialog.open(ActorsDialogComponent, {
      width: '250px',
      data: { movieId: this.movie.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
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
