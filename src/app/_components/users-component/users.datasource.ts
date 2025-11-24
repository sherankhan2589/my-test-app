import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { BaseDataSource } from '../../_base-components/base.datasource';
import { Users } from '../../_models/users';
import { UsersService } from '../../_services/users.service';

export class UserDataSource extends BaseDataSource implements DataSource<Users> {
  constructor(private userService: UsersService) {
    super();
    this.datasourceSubject = new BehaviorSubject<Users[]>([]);
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading$ = this.loadingSubject.asObservable();
  }

  override load(
    select = ['*'],
    sortBy: string,
    sortDirection: string,
    pageNumber: number,
    pageSize: number,
    filter: Partial<{
      Name: string | null;
      Email: string | null;
      Role: string | null;
    }>
  ): Observable<any> {
    this.loadingSubject.next(true);
    let observable = this.userService.list(
      select,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      filter
    );
    observable
      .pipe(
        catchError(() => of({ Users: [] })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((d: any) => {
        this.totalItems = d.total;
        this.data = d.users;
        console.log(d.users);
        return this.datasourceSubject.next(d.users || []);
      });

    return observable;
  }

  override connect(collectionViewer: CollectionViewer): Observable<Users[]> {
    return this.datasourceSubject.asObservable();
  }

  override disconnect(collectionViewer: CollectionViewer): void {
    this.datasourceSubject.complete();
    this.loadingSubject.complete();
  }
}
