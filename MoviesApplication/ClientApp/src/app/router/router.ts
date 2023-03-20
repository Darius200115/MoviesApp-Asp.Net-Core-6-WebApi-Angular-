import { RouterModule } from '@angular/router';
import { ActorPageComponent } from '../components/actor-page/actor-page.component';
import { ActorsListComponent } from '../components/actors-list/actors-list.component';
import { AddNewMovieComponent } from '../components/add-new-movie/add-new-movie.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { MoviePageComponent } from '../components/movie-page/movie-page.component';
import { MoviesListComponent } from '../components/movies-list/movies-list.component';
import { RegistrationPageComponent } from '../components/registration-page/registration-page.component';
import { Movie } from '../shared/movie';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MoviesListComponent },
  { path: 'addMovie', component: AddNewMovieComponent },
  { path: 'movie/:id', component: MoviePageComponent },
  { path: 'actor/:id', component: ActorPageComponent },
  { path: 'actors', component: ActorsListComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: '**', redirectTo: '/' },
];

const router = RouterModule.forRoot(routes, {
  useHash: false,
});

export default router;
