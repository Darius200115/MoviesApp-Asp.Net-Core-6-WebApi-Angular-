import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import router from './router/router';
import { MovieService } from './services/movie.service';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { AddNewMovieComponent } from './components/add-new-movie/add-new-movie.component';
import { MoviePageComponent } from './components/movie-page/movie-page.component';
import { Youtube } from './safe.pipe';
import { MovieDialogComponent } from './components/movie-page/movie-dialog/movie-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActorsListComponent } from './components/actors-list/actors-list.component';
import { ActorService } from './services/actor.service';
import { ActorPageComponent } from './components/actor-page/actor-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RecomendedMovieComponent } from './components/recomended-movie/recomended-movie.component';
import { HomeComponent } from './components/home/home.component';
import { ThisYearReleasedComponent } from './components/this-year-released/this-year-released.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActorsDialogComponent } from './components/movie-page/actors-dialog/actors-dialog.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AccountService } from './services/account.service';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MoviesListComponent,
    AddNewMovieComponent,
    MoviePageComponent,
    Youtube,
    MovieDialogComponent,
    ActorsListComponent,
    ActorPageComponent,
    RecomendedMovieComponent,
    HomeComponent,
    ThisYearReleasedComponent,
    ActorsDialogComponent,
    LoginPageComponent,
    RegistrationPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatListModule,
    MatCommonModule,
    MatButtonModule,
    CarouselModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatInputModule,
    router,
    FontAwesomeModule,
  ],
  providers: [MovieService, ActorService, AccountService],
  bootstrap: [AppComponent],
})
export class AppModule {}
