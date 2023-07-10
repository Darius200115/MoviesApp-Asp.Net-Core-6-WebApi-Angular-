import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, tap } from 'rxjs';
import { LoginRequest, LoginResult } from '../shared/loginResult';
import { User } from '../shared/user';
import jwtDecode from 'jwt-decode';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  token: any = localStorage.getItem('access_token');
  tokenPayload: any;
  private readonly userEmailKey = 'user';
  registration(user: User): Observable<any> {
    return this.http.post<User>('/api/account/registration', user);
  }

  login(creds: LoginRequest): Observable<LoginResult> {
    return this.http.post<LoginResult>('/api/account/CreateToken', creds).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.token);
        const tokenPayload: any = jwtDecode(res.token);
        localStorage.setItem('user', tokenPayload.sub);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
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

  getUserEmail(): string {
    return localStorage.getItem(this.userEmailKey);
  }
  
}
