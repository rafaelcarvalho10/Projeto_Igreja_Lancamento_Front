 import { AuthService } from 'src/app/shared/auth/auth.service';

import {  Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css']
})
export class PaginaLoginComponent implements OnInit {

  logging: boolean = false;

  public form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })


  // login: Login = {
  //   username: '',
  //   password: '',
  //}

  constructor(private _authService: AuthService,
                                private router: Router,
                                private snackBar: MatSnackBar) { }

  ngOnInit(): void {
     this._authService.logout();
  }


  doLogin(): void {
    if (this.form.valid) {
      debugger
      this.logging = true;
      const obj = this.form.value;
      this._authService.login(obj.username, obj.password)
        .subscribe((user) => {
          this.snackBar.open(
            'Bem vindo(a)!', 'OK', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            }
          );
          this.logging = false;
          this.router.navigate(['/']);
        },
        () => {
          this.snackBar.open(
            'Credenciais inválidas', 'OK', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'right'
            }
          );
        })
    }
  }

}
