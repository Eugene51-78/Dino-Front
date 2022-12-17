import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinotrainerComponent } from './dino-trainer.component';

describe('MedicPageComponent', () => {
  let component: DinotrainerComponent;
  let fixture: ComponentFixture<DinotrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinotrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinotrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
