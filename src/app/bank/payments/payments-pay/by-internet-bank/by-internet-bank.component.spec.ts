import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByInternetBankComponent } from './by-internet-bank.component';

describe('ByInternetBankComponent', () => {
  let component: ByInternetBankComponent;
  let fixture: ComponentFixture<ByInternetBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByInternetBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByInternetBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
