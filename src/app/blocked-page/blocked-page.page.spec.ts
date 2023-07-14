import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BlockedPagePage } from './blocked-page.page';

describe('BlockedPagePage', () => {
  let component: BlockedPagePage;
  let fixture: ComponentFixture<BlockedPagePage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(BlockedPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
