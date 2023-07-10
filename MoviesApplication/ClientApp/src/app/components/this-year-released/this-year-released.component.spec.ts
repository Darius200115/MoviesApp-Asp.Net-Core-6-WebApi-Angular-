import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisYearReleasedComponent } from './this-year-released.component';

describe('ThisYearReleasedComponent', () => {
  let component: ThisYearReleasedComponent;
  let fixture: ComponentFixture<ThisYearReleasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThisYearReleasedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThisYearReleasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
});
