import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ActorService } from 'src/app/services/actor.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-actors-dialog',
  templateUrl: './actors-dialog.component.html',
  styleUrls: ['./actors-dialog.component.css'],
})
export class ActorsDialogComponent {
  search = new FormControl('');
  filteredActors: any;
  searchName: string = '';
  searchSurname: string = '';
  searchTerm: string;

  constructor(
    public dialogRef: MatDialogRef<ActorsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movieId: string },
    public actorService: ActorService
  ) {}

  searchActor() {
    if (!this.searchTerm) {
      this.filteredActors = this.actorService.actors;
    } else {
      this.filteredActors = this.actorService.actors.filter(
        (actor) =>
          actor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          actor.secondName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  ngOnInit(): void {
    this.actorService.loadActors().subscribe((data) => {
      this.filteredActors = data;
    });
  }

  selectActor(actor: any) {
    this.actorService.addActorToMovie(this.data.movieId, actor.id);
    this.dialogRef.close();
    location.reload();
  }
}
