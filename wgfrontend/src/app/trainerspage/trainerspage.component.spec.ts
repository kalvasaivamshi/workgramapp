import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerspageComponent } from './trainerspage.component';

describe('TrainerspageComponent', () => {
  let component: TrainerspageComponent;
  let fixture: ComponentFixture<TrainerspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerspageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
