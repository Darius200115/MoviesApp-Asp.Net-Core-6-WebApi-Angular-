import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsDialogComponent } from './actors-dialog.component';

describe('ActorsDialogComponent', () => {
  let component: ActorsDialogComponent;
  let fixture: ComponentFixture<ActorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
