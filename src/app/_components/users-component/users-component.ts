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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UsersService) {}

  dataSource!: UserDataSource;
  optionsData: string[] = ['Admin', 'User', 'Agent'];

  displayedColumns = [
    { title: 'Name', name: 'firstName', type: 'text', sortable: true },
    { title: 'Email', name: 'email', type: 'email', sortable: true },
    { title: 'DOB', name: 'birthDate', type: 'link', sortable: true },
    { title: 'Role', name: 'role', type: 'select', options: this.optionsData, sortable: true },
    { title: 'Actions', name: 'action', type: 'edit', sortable: false },
  ];

  filterColumns = this.displayedColumns.map((col) => col.name + '_filter');

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

  get columnNames() {
    return this.displayedColumns.map((col) => col.name);
  }
}
