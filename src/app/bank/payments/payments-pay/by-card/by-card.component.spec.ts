import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByCardComponent } from './by-card.component';

describe('ByCardComponent', () => {
  let component: ByCardComponent;
  let fixture: ComponentFixture<ByCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
