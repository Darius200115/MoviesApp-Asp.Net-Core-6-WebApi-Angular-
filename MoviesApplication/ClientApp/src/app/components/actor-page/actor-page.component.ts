import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorService } from 'src/app/services/actor.service';
import { Actor } from 'src/app/shared/actor';

@Component({
  selector: 'app-actor-page',
  templateUrl: './actor-page.component.html',
  styleUrls: ['./actor-page.component.css'],
})
export class ActorPageComponent implements OnInit {
  public actor: Actor = new Actor();
  constructor(
    private activatedRoute: ActivatedRoute,
    public service: ActorService
  ) {}

  ngOnInit(): void {
    let ActorId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.loadMovieById(ActorId!).subscribe((a) => {
      this.actor = a;
    });
  }
}
