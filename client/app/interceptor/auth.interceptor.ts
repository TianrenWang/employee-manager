import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

    // Intercepts the outbound HTTP requests to add the authentication token
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let token: string | null = localStorage.getItem('auth_token');
        let header: any = {
            'Content-Type' : 'application/json'
        };
        if (token){
            header['Authorization'] = token;
            request = request.clone({
                setHeaders: header
            });
        }
        return next.handle(request);
    }
}