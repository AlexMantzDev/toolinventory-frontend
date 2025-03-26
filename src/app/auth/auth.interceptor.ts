import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<boolean>(false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService)
  const authRequest = req.clone({withCredentials: true});

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(false);

          return authService.refreshSession().pipe(
            switchMap(() => {
              isRefreshing = false;
              refreshTokenSubject.next(true);
              // Retry the original request
              return next(authRequest);
            }),
            catchError(err => {
              isRefreshing = false;
              return throwError(() => err);
            })
          );
        } else {
          return refreshTokenSubject.pipe(
            filter(status => status === true),
            take(1),
            switchMap(() => next(authRequest))
          );
        }
      }

      return throwError(() => error);
    })
  )
};
