import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';

export abstract class BaseDataSource {
  data: any[] = [];
  totalItems = 0;

  datasourceSubject = new BehaviorSubject<any[]>([]);

  loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  load(
    select = ['*'],
    sortBy: string,
    sortDirection: string,
    pageNumber: number,
    pageSize: number,
    filter: Partial<{}>
  ): Observable<any> {
    throw new Error('You have to implement the method doSomething!');
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    throw new Error('You have to implement the method doSomething!');
  }

  disconnect(collectionViewer: CollectionViewer): void {
    throw new Error('You have to implement the method doSomething!');
  }
}
