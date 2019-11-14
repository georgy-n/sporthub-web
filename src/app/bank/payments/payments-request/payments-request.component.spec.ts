import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsRequestComponent } from './payments-request.component';

describe('PaymentsRequestComponent', () => {
  let component: PaymentsRequestComponent;
  let fixture: ComponentFixture<PaymentsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
