import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinoTableComponent } from './dino-table.component';

describe('PersonalTableComponent', () => {
  let component: DinoTableComponent;
  let fixture: ComponentFixture<DinoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DinoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DinoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
