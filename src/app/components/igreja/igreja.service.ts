import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Igreja } from './igreja.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IgrejaService {
  // baseUrl = "http://localhost:5000/igrejas"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessageIgreja(msg: string): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  //metodo para criar uma igreja e interagir com o back-end
  // create(igreja: Igreja): Observable<Igreja> {
  //   return this.http.post<Igreja>(`${environment.apiUrl}/igrejas`, igreja)
  // }

  create(cod_igreja: string, nome_igreja: string): Observable<Igreja> {
    const obj = { cod_igreja: cod_igreja, nome_igreja: nome_igreja };
    return this.http.post<Igreja>(`${environment.apiUrl}/igrejas`, obj);
  }

  //metodo para atualizar igreja
  put(id: string, cod_igreja: string, nome_igreja: string): Observable<Igreja> {
    const obj = { id: id, cod_igreja: cod_igreja, nome_igreja: nome_igreja };
    return this.http.put<Igreja>(`${environment.apiUrl}/igrejas/${id}`, obj);
  }

  //metodo para ler as igrejas criadas
  read(): Observable<Igreja[]> {
    return this.http.get<Igreja[]>(`${environment.apiUrl}/igrejas`);
  }

  //metodo para ler uma igreja especifica criada
  readId(id: string): Observable<Igreja[]> {
    return this.http.get<Igreja[]>(`${environment.apiUrl}/igrejas/${id}`);
  }

  //metodo para deletar uma igreja
  delete(id: string): Observable<Igreja> {
    const obj = { id: id };
    return this.http.delete<Igreja>(`${environment.apiUrl}/igrejas/${id}`);
  }
}
