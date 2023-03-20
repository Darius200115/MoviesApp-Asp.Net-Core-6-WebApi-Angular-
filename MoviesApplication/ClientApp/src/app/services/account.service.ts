import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, tap } from 'rxjs';
import { LoginRequest, LoginResult } from '../shared/loginResult';
import { User } from '../shared/user';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  registration(user: User): Observable<any> {
    return this.http.post<User>('/api/account/registration', user);
  }

  login(creds: LoginRequest): Observable<LoginResult> {
    return this.http.post<LoginResult>('/api/account/CreateToken', creds).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.token);
      })
    );
  }

  logout() {
    return localStorage.removeItem('access_token');
    
  }

  loggedIn(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return of(false);
    }
    return of(true);
    // return new Observable((token) => {
    //   token.next(!!localStorage.getItem('access_token'));
    // });
  }
}
