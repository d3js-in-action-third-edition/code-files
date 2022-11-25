import { Component, Input } from '@angular/core';

@Component({
  selector: '[appBadge]',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent {
  @Input() translation: Array<number> = [];
  @Input() strokeColor: string = '#000';
  @Input() label: string = '';

  getTranslation() {
    return `translate(${this.translation[0]}px, ${this.translation[1]}px)`;
  }
}
