import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingFiltersComponent } from './ranking-filters.component';

describe('RankingFiltersComponent', () => {
  let component: RankingFiltersComponent;
  let fixture: ComponentFixture<RankingFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
