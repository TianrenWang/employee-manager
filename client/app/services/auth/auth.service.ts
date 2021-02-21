import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'client/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    localStorage.clear();
  }

  // Fetches the authentication token
  authorize(username: string, password: string): Observable<string | null>{
    let url = environment.backendURL + "/api/admin/authorize";
    return this.http.post<any>(url, {username: username, password: password}).pipe(
      map(response => {
        if (response.success === true && response.auth_token){
          localStorage.setItem("auth_token", response.auth_token);
          return response.auth_token;
        } else {
          return null;
        }
      })
    );
  }

  isLoggedIn(): boolean{
    return localStorage.getItem("auth_token") !== null;
  }
}
