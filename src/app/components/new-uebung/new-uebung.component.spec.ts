import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUebungComponent } from './new-uebung.component';

describe('NewUebungComponent', () => {
  let component: NewUebungComponent;
  let fixture: ComponentFixture<NewUebungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUebungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUebungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
