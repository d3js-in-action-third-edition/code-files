import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ranking-filters',
  templateUrl: './ranking-filters.component.html',
  styleUrls: ['./ranking-filters.component.css']
})
export class RankingFiltersComponent {
  @Input() filters: Array<any> = [];
  @Input() activeFilter: string = '';

  trackByFn(index: number, filter: {id: string, label: string}) {
    return `filter-${filter.id}`;
  }
}
