import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/services/actor.service';

@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css'],
})
export class ActorsListComponent implements OnInit {
  constructor(public service: ActorService) {}

  ngOnInit(): void {
    this.service.loadActors().subscribe(() => {});
  }
}
