import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-datatable-listing',
  standalone: false,
  templateUrl: './datatable-listing.html',
  styleUrl: './datatable-listing.scss',
})
export class DatatableListing {
  @Input() dataSource!: any;
  @Input() displayedColumns!: string[];
  @Input() filterColumns!: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() showFormEvent = new EventEmitter<any>();
  @Output() filterChnage = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<any>();

  ngAfterViewInit() {
    console.warn(this.dataSource);

    if (this.sort) {
      this.sort.sortChange.subscribe((sort) => this.sortChange.emit(sort));
    }
    if (this.paginator) {
      this.paginator.page.subscribe((page) => this.pageChange.emit(page));
    }
  }

  showForm(list: any) {
    console.log(list);
    this.showFormEvent.emit({ ...list });
  }

  onFilterChange(column: string, value: string) {
    this.filterChnage.emit({ column, value });
  }
  initDisplayColumns() {
    if (!this.displayedColumns) {
      this.displayedColumns = [];
    }
    this.displayedColumns = this.displayedColumns.map((item: any) => {
      return item.name;
    });
  }
}
