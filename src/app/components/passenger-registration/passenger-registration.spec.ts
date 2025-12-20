import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerRegistration } from './passenger-registration';

describe('PassengerRegistration', () => {
  let component: PassengerRegistration;
  let fixture: ComponentFixture<PassengerRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
