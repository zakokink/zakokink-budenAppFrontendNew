import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrainingEinheitenComponent } from './all-training-einheiten.component';

describe('AllTrainingEinheitenComponent', () => {
  let component: AllTrainingEinheitenComponent;
  let fixture: ComponentFixture<AllTrainingEinheitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTrainingEinheitenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTrainingEinheitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
