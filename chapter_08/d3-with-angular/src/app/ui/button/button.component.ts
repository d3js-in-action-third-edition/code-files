import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() type: string = "button";
  @Input() label: string = "";
  @Input() id: string = "";
  @Input() index: number = 0;
  @Input() isActive: boolean = false;
  @Output() clickDetected = new EventEmitter<string>();

  className = "";

  ngOnInit() {
    this.updateClassNames();
  }

  ngOnChanges() {
    this.updateClassNames();
  }

  updateClassNames() {
    this.className = `${this.index === 0 ? "first" : ""} ${this.isActive ? "active" : ""}`;
  }

  handleClick() {
    this.clickDetected.emit(this.id);
  }
}
