import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { tap } from 'rxjs/operators';
import { User } from '../user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  // private subjUser$: BehaviorSubject<User> = new BehaviorSubject();
  // private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);


  private subjUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



  constructor(
      private http: HttpClient,
      private router: Router,
  ) {
  }

  login(username: string, password: string): Observable<User> {
    debugger
    const obj = { username: username, password: password };

    return this.http
    .post<User>(`${environment.apiUrl}/users/login`, obj)
    .pipe(
      tap((u: User)  => {
        localStorage.setItem('token.token', u.token);
        this.subjLoggedIn$.next(true);
        this.subjUser$.next(true);
      })
    );
  }


//   login(login: Login): Observable<Login>{
//     let request = JSON.stringify(login);
//     const httpOptions = {
//      headers: new HttpHeaders({'Content-Type': 'application/json'})
//     }
//  return this.http
//  .post<User>(`${environment.apiUrl}/users/login`, request, httpOptions)
//  .pipe(
//    tap((u: User)  => {
//      localStorage.setItem('token.token', u.token);
//      this.subjLoggedIn$.next(true);
//      this.subjUser$.next(true);
//    })
//  );
// }

  getToken(): string | null {
    return localStorage.getItem('token.token');
  }

  public isAuthenticated(): boolean {
    if (this.getToken())
      return true;

    return false;
  }

  logout() {
    localStorage.removeItem('token.token');
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(false);
    this.router.navigate(['login']);
  }
  // logout() {
  //   localStorage.clear();
  //   this.subjUser$.next(false);
  //   this.router.navigate(['/login']);
  // }
}
