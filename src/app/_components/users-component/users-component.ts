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
export class UserComponent implements OnInit {
  dataSource!: UserDataSource;
  displayedColumns = [
    { title: 'Name', name: 'firstName', type: 'text' },
    { title: 'Email', name: 'email', type: 'email' },
    { title: 'DOB', name: 'birthDate', type: 'link' },
    { title: 'Role', name: 'role', type: 'select', options: ['Admin', 'User', 'Guest'] },
    { title: 'Actions', name: 'action', type: 'edit' },
  ];
  get columnNames() {
    return this.displayedColumns.map((col) => col.name);
  }

  get filterColumns() {
    return this.displayedColumns.map((col) => col.name + '_filter');
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.dataSource = new UserDataSource(this.userService);
    this.loadUsers();
  }

  loadUsers(filters: any = {}) {
    this.dataSource.load(['*'], 'Name', 'asc', 1, 10, filters);
  }

  onFilterChange(event: any) {
    const filters = { [event.column]: event.value };
    this.loadUsers(filters);
  }

  onShowForm(item: any) {
    console.log('Edit clicked:', item);
  }
}
