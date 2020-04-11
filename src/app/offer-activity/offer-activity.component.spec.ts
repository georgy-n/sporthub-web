import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferActivityComponent } from './offer-activity.component';

describe('OfferActivityComponent', () => {
  let component: OfferActivityComponent;
  let fixture: ComponentFixture<OfferActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
