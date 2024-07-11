import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status === 401) {
        return EMPTY;
      }
      if (e.status === 404 || e.status === 500) {
        router.navigate(['/Employee']);

        alert('somethimg went wrong');
        return EMPTY;
      }
      const error = e.error?.error?.message || e.statusText;
      return throwError(() => error);
    })
  );
};
