import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  override list(
    select = ['*'],
    sortBy = 'id',
    sortOrder = 'asc',
    pageNumber = 1,
    pageSize = 10,
    filter: Partial<{
      Name: string | null;
      Email: string | null;
      Role: string | null;
    }>
  ): Observable<any> {
    let qParams = new HttpParams();

    if (filter?.Name) {
      qParams = qParams.append('filters[name]', filter?.Name);
    }

    if (filter?.Email) {
      qParams = qParams.append('filters[email]', filter?.Email);
    }

    if (filter?.Role) {
      qParams = qParams.append('filters[role]', filter?.Role);
    }

    qParams = qParams.append('current_page', pageNumber);
    if (pageSize !== -1) {
      qParams = qParams.append('page_size', pageSize);
    } else {
      qParams = qParams.append('all', 1);
    }
    return this.http
      .get<any>('https://dummyjson.com/users', { ...this.httpOptions, params: qParams })
      .pipe(
        map((data: any) => {
          return data || [];
        })
      );
  }
}
