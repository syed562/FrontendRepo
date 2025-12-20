import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightAdmin } from './flight-admin';

describe('FlightAdmin', () => {
  let component: FlightAdmin;
  let fixture: ComponentFixture<FlightAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
