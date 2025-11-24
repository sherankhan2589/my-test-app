import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDataSource } from './users.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-users-component',
  standalone: false,
  templateUrl: './users-component.html',
  styleUrl: './users-component.scss',
})
export class UsersComponent implements OnInit {
  constructor(private usersSerive: UsersService) {}

  dataSource!: UserDataSource;
  tableData: any[] = [];
  displayedColumns = ['firstName', 'email', 'role'];
  filterColumns = this.displayedColumns.map((col) => col + '_filter');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    console.warn('this.usersSerive', this.usersSerive);

    this.dataSource = new UserDataSource(this.usersSerive);
    // console.warn('this.dataSource', this.dataSource.datasourceSubject.getValue());
    this.dataSource.datasourceSubject.subscribe((res) => {
      console.log('FINAL DATA:', res);
      this.tableData = res;
    });

    this.loadData();
  }

  loadData(filters: any = {}) {
    this.dataSource.load(['*'], 'Name', 'asc', 0, 10, filters);
  }

  onFilterChange(event: any) {
    const filters = { [event.column]: event.value };
    console.log('Filter Change', filters);
  }

  onShowForm(item: any) {
    console.log(item);
  }
}
