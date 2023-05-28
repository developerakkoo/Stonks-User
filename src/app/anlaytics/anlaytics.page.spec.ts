import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnlayticsPage } from './anlaytics.page';

describe('AnlayticsPage', () => {
  let component: AnlayticsPage;
  let fixture: ComponentFixture<AnlayticsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnlayticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
