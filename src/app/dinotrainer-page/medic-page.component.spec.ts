import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicPageComponent } from './medic-page.component';

describe('MedicPageComponent', () => {
  let component: MedicPageComponent;
  let fixture: ComponentFixture<MedicPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
