import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinPage } from './loggedin-page';

describe('LoggedinPage', () => {
  let component: LoggedinPage;
  let fixture: ComponentFixture<LoggedinPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedinPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
