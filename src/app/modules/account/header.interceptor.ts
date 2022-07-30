import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      // add auth header with jwt if account is logged in and request is to the api url
      const token = this.auth.getToken();
      const isLoggedIn = this.auth.loggedIn();
      if (isLoggedIn) {
          request = request.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
          });
      }
      return next.handle(request);
  }
}
