import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTableComponent } from './personal-table.component';

describe('PersonalTableComponent', () => {
  let component: PersonalTableComponent;
  let fixture: ComponentFixture<PersonalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
