import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmbComponent } from './umb.component';

describe('UmbComponent', () => {
  let component: UmbComponent;
  let fixture: ComponentFixture<UmbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
