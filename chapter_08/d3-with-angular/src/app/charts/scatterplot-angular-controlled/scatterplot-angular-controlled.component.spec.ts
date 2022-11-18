import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterplotAngularControlledComponent } from './scatterplot-angular-controlled.component';

describe('ScatterplotAngularControlledComponent', () => {
  let component: ScatterplotAngularControlledComponent;
  let fixture: ComponentFixture<ScatterplotAngularControlledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterplotAngularControlledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScatterplotAngularControlledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
