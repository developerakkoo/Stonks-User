import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistePage } from './registe.page';

describe('RegistePage', () => {
  let component: RegistePage;
  let fixture: ComponentFixture<RegistePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
