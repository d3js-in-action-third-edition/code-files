import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() type: string = "button";
  @Input() label: string = "";
  @Input() index: number = 0;
  @Input() isActive: boolean = false;

  className = "";

  ngOnInit() {
    this.initializeVariables();
  }

  initializeVariables() {
    this.className = `${this.index === 0 ? "first" : ""} ${this.isActive ? "active" : ""}`;
  }
}
