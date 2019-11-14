import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsPayComponent } from './payments-pay.component';

describe('PaymentsPayComponent', () => {
  let component: PaymentsPayComponent;
  let fixture: ComponentFixture<PaymentsPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
