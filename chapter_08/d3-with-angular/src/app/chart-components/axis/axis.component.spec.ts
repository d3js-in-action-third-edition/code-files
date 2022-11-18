import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisComponent } from './axis.component';

describe('AxisComponent', () => {
  let component: AxisComponent;
  let fixture: ComponentFixture<AxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AxisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
