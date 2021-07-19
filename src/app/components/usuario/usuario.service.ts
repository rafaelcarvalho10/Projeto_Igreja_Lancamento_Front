import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';
import { IgrejaUsuario } from './igrejaUsuario.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // baseUrl = "http://localhost:3000/users"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessageUsuario(msg: string): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  //metodo para criar um usuario e interagir com o back-end
  create(
    username: string,
    password: string,
    role: string,
    igrejaUsuario: IgrejaUsuario[]
  ): Observable<Usuario> {
    const obj = {
      username: username,
      password: password,
      role: role,
      IgrejaUsuario: igrejaUsuario,
    };
    return this.http.post<Usuario>(`${environment.apiUrl}/users`, obj);
  }

  //metodo para atualizar usuario
  put(
    id: string,
    username: string,
    password: string,
    role: string,
    igrejaUsuario: IgrejaUsuario[]
  ): Observable<Usuario> {
    const obj = {
      id: id,
      username: username,
      password: password,
      role: role,
      Igrejausuario: igrejaUsuario,
    };
    return this.http.put<Usuario>(`${environment.apiUrl}/users/${id}`, obj);
  }

  //metodo para ler os lançamentos criados
  read(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/users`);
  }

  //metodo para ler um usuario especifico
  readId(id: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/users/${id}`);
  }

  //metodo para deletar uma igreja
  delete(id: string): Observable<Usuario> {
    const obj = { id: id };
    return this.http.delete<Usuario>(`${environment.apiUrl}/users/${id}`);
  }

  //teste
  // createIgrejaUser(
  //   igrejaId: number,
  //   userId: number
  // ): Observable<IgrejaUsuario> {
  //   const obj = { igrejaId: igrejaId, userId: userId };
  //   return this.http.post<IgrejaUsuario>(
  //     `${environment.apiUrl}/IgrejasUsuario`,
  //     obj
  //   );
  // }
}
