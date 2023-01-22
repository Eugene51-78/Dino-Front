import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDinoComponent } from './add-dino.component';

describe('AddUserComponent', () => {
  let component: AddDinoComponent;
  let fixture: ComponentFixture<AddDinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
