import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusfreeComponent } from './aboutusfree.component';

describe('AboutusfreeComponent', () => {
  let component: AboutusfreeComponent;
  let fixture: ComponentFixture<AboutusfreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutusfreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusfreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
