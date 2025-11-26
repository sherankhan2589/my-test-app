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
  @Input() displayedColumns!: { title: string; name: string; type: string; options?: string[] }[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() showFormEvent = new EventEmitter<any>();
  @Output() filterChnage = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<any>();
  columnNames: string[] = [];
  filterColumns: string[] = [];

  ngOnInit() {
    this.columnNames = this.displayedColumns.map((col) => col.name);
    this.filterColumns = this.displayedColumns.map((col) => col.name + '_filter');
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe((sort) => this.sortChange.emit(sort));
    this.paginator.page.subscribe((page) => this.pageChange.emit(page));
  }

  showForm(list: any) {
    this.showFormEvent.emit({ ...list });
    console.log(list);
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
  onClickLink(row: any) {
    console.log('Link clicked:', row);
  }
}
