import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemilleroUscoComponent } from './semillero-usco.component';

describe('SemilleroUscoComponent', () => {
  let component: SemilleroUscoComponent;
  let fixture: ComponentFixture<SemilleroUscoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemilleroUscoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemilleroUscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
