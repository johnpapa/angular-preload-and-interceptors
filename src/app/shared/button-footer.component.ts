import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-button-footer',
    template: `
    <button
      class="link"
      [ngClass]="className"
      [attr.aria-label]="label"
      tabindex="0"
      [attr.data-id]="item?.id"
      (click)="handleClick()"
    >
      <i [ngClass]="iconClasses"></i> <span>{{ label }}</span>
    </button>
  `,
    standalone: true,
    imports: [NgClass],
})
export class ButtonFooterComponent implements OnInit {
  @Input() label;
  @Input() className;
  @Input() iconClasses;
  @Input() item;
  @Input() dataId;

  @Output() clicked = new EventEmitter<any>();

  ngOnInit() {}

  handleClick() {
    this.clicked.emit(this.item);
  }
}
