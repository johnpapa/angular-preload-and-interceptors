import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-list-header',
    template: `
    <div class="content-title-group">
      <a router-link="/">
        <h2 class="title">{{ title }}</h2>
      </a>
      <button class="button add-button" (click)="handleAdd()" aria-label="add" *ngIf="showAdd">
        <i class="fas fa-plus" aria-hidden="true"></i>
      </button>
      <button class="button refresh-button" (click)="handleRefresh()" aria-label="refresh">
        <i class="fas fa-sync" aria-hidden="true"></i>
      </button>
    </div>
  `,
    standalone: true,
    imports: [NgIf],
})
export class ListHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() showAdd = true;
  @Output() add = new EventEmitter();
  @Output() refresh = new EventEmitter();

  ngOnInit() {}

  handleAdd() {
    this.add.emit();
  }
  handleRefresh() {
    this.refresh.emit();
  }
}
