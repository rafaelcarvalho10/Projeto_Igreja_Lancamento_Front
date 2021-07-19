import { Lancamento } from './lancamento.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  //metodo para criar um lancamento e interagir com o back-end
  create(lancamento: Lancamento): Observable<Lancamento> {
    let request = JSON.stringify(lancamento);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Lancamento>(
      `${environment.apiUrl}/lancamentos`,
      request,
      httpOptions
    );
  }

  put(lancamento: Lancamento): Observable<Lancamento> {
    debugger;
    let request = JSON.stringify(lancamento);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put<Lancamento>(
      `${environment.apiUrl}/lancamentos/${lancamento.id}`,
      request,
      httpOptions
    );
  }

  //metodo para ler os lançamentos criados
  read(): Observable<Lancamento[]> {
    return this.http.get<Lancamento[]>(`${environment.apiUrl}/lancamentos`);
  }

  //metodo para ler todos lancamentos de uma igreja especifica selecionada
  readById(id: string): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${environment.apiUrl}/lancamentos/${id}`);
  }

  readByIdIgreja(id: number): Observable<Lancamento[]> {
    const url = `${environment.apiUrl}/lancamentos/igrejas/${id}`;
    return this.http.get<Lancamento[]>(url);
  }

  delete(id: string): Observable<Lancamento> {
    const obj = { id: id };
    return this.http.delete<Lancamento>(
      `${environment.apiUrl}/lancamentos/${id}`
    );
  }
}
