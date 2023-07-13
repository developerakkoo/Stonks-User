import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StripePayementPage } from './stripe-payement.page';

describe('StripePayementPage', () => {
  let component: StripePayementPage;
  let fixture: ComponentFixture<StripePayementPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(StripePayementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
