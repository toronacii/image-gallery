import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  showed$ = new BehaviorSubject<boolean>(false);

  show() {
    this.showed$.next(true);
  }

  hide() {
    this.showed$.next(false);
  }

  prepare<T>(obs: Observable<T>) {
    this.show();
    return obs.pipe(finalize(() => this.hide()));
  }
}
