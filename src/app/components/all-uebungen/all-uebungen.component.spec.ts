import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUebungenComponent } from './all-uebungen.component';

describe('AllUebungenComponent', () => {
  let component: AllUebungenComponent;
  let fixture: ComponentFixture<AllUebungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUebungenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUebungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
