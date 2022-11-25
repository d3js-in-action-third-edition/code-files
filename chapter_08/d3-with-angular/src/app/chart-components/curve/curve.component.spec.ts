import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurveComponent } from './curve.component';

describe('CurveComponent', () => {
  let component: CurveComponent;
  let fixture: ComponentFixture<CurveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
