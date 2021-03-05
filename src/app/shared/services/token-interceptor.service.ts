import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshToken$ = new BehaviorSubject<any>(null);


  constructor(
    private authService: AuthService,
    private tokenService: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.isAuth()) {
      request = this.addToken(request);
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next, error);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.get()}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler, error?: any) {

    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshToken$.next(null);

      return this.authService.auth().pipe(
        switchMap(token => {
          this.isRefreshing = false;
          this.refreshToken$.next(token);
          return next.handle(this.addToken(request));
        }),
        catchError(error => this._catchError(error)));

    } else {

      if (request.url.includes('auth/refresh')) {
        return this._catchError(error);
      }

      return this.refreshToken$.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => next.handle(this.addToken(request))));
    }
  }

  private _catchError(error) {
    this.tokenService.remove();
    location.href = location.href;
    return throwError(error);
  }
}
