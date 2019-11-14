import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsOptionComponent } from './payments-option.component';

describe('PaymentsOptionComponent', () => {
  let component: PaymentsOptionComponent;
  let fixture: ComponentFixture<PaymentsOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
