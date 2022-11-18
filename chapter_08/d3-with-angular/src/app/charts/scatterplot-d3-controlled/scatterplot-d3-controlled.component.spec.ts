import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterplotD3ControlledComponent } from './scatterplot-d3-controlled.component';

describe('ScatterplotD3ControlledComponent', () => {
  let component: ScatterplotD3ControlledComponent;
  let fixture: ComponentFixture<ScatterplotD3ControlledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterplotD3ControlledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScatterplotD3ControlledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
