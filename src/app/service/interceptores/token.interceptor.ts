import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/component/login/auth.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.obterTokenUsuario;
        const requestUrl: Array<any> = request.url.split('/');
        const apiUrl: Array<any> = environment.API.split('/');

        if (token && requestUrl[2] === apiUrl[2]) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    token: `${token}`
                }
            });
            return next.handle(request).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401)
                  this.authService.logout();
                else
                  return throwError(error.message);
            }));
        }
        else {
            return next.handle(request);
        }
  }
}
