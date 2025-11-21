import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(public http: HttpClient) {}

  create(data: any): Observable<any> {
    throw new Error('You have to implement the method doSomething!');
  }

  update(data: any): Observable<any> {
    throw new Error('You have to implement the method doSomething!');
  }

  find(id: number): Observable<any> {
    throw new Error('You have to implement the method doSomething!');
  }

  list(
    select = ['*'],
    sortBy = 'id',
    sortOrder = 'asc',
    pageNumber = 1,
    pageSize = 10,
    filter: Partial<{}>
  ): Observable<any> {
    throw new Error('You have to implement the method doSomething!');
  }
  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }
  private _handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
