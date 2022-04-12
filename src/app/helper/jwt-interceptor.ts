import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {Injectable} from "@angular/core";


@Injectable()
export class JwtInterceptor implements HttpInterceptor { //Interceptor: đánh chặn, đại loại là thêm 1 thao tác vào trước 1 bước tương tác với http
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}

export const AuthInterceptorProvider = [
  {
    provider : HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
  }
]
