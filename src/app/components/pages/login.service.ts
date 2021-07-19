// import { MatSnackBar } from '@angular/material/snack-bar';
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';


// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {

//   baseUrl = "https://localhost:5001/users/login"

//   constructor(private snackBar: MatSnackBar , private http: HttpClient) { }

//   showMessageLogin(msg: string): void {
//     this.snackBar.open(msg, 'x', {
//       duration: 3000,
//       horizontalPosition: "right",
//       verticalPosition: "top"
//     })
//   }

//   // metodo para logar no sistema
//   loginUsuario(username: string, password: string): Observable<User> {
//     const obj = { usuario: username, senha: password };

//     return this.http
//       .post(`${environment.apiUrl}/users/login`, obj)
//       .pipe(
//         tap((u: User) => {
//           localStorage.setItem('athvs.authData', u.token);
//           this.subjLoggedIn$.next(true);
//           this.subjUser$.next(u);
//         })
//       );
//   }

//   getToken(): string {
//     return localStorage.getItem('');
//   }

//   public isAuthenticated(): boolean {
//     if (this.getToken())
//       return true;

//     return false;
//   }

// // Sair do sistema
//   logout() {
//     localStorage.removeItem('athvs.authData');
//     localStorage.removeItem('church');
//     this.subjLoggedIn$.next(false);
//     this.subjUser$.next(null);
//   }

// }
