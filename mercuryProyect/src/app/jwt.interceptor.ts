import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable()
export class jwtInterceptor {
  constructor(private cookieService: CookieService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('token');

    if (!token) {
      this.router.navigate(['/login']);
      return next.handle(req);
    }

    const decodedToken: any = jwtDecode.jwtDecode(token);
    const isExpired = decodedToken.exp * 1000 < Date.now();

    if (isExpired) {
      this.router.navigate(['/login']);
      return next.handle(req);
    }

    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(cloned);
  }
}
