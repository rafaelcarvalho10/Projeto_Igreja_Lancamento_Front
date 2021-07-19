import { LancamentoService } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Lancamento } from '../lancamento.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lancamento-delete',
  templateUrl: './lancamento-delete.component.html',
  styleUrls: ['./lancamento-delete.component.css'],
})
export class LancamentoDeleteComponent implements OnInit {
  public lancamentoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    cod_lancamento: new FormControl(null, [Validators.required]),
    Data_lancamento: new FormControl(null, [Validators.required]),
    Qtd_pessoas: new FormControl(null),
    Vl_oferta: new FormControl(null),
    Qtd_dizimistas: new FormControl(null),
    Vl_total_dizimos: new FormControl(null),
    igrejaId: new FormControl(null),
  });

  @ViewChild('form') form: NgForm | undefined;

  constructor(
    private lancamentoService: LancamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    if (id) {
      this.lancamentoService.readById(`${id}`).subscribe((resp: Lancamento) => {
        debugger;
        this.lancamentoForm = new FormGroup({
          id: new FormControl(resp.id),
          cod_lancamento: new FormControl(resp.cod_lancamento, [
            Validators.required,
          ]),
          //data_Lancamento: new FormControl(new Date(resp.data_Lancamento)),
          data_Lancamento: new FormControl(resp.data_Lancamento),
          qtd_pessoas: new FormControl(resp.qtd_pessoas),
          vl_oferta: new FormControl(resp.vl_oferta),
          qtd_dizimistas: new FormControl(resp.qtd_dizimistas),
          vl_total_dizimos: new FormControl(resp.vl_total_dizimos),
          igrejaId: new FormControl(resp.igrejaId),
        });
        // this.lancamentoForm.setValue(resp);
      });
    }
  }

  deleteLancamento(): void {
    if (this.lancamentoForm.valid) {
      let data = this.lancamentoForm.value;
      if (data.id != null) {
        this.lancamentoService.delete(data.id).subscribe(
          (lancamento) => this.notify('Lancamento excluido !'),
          (error) => {
            console.log(error);
            this.notify('Problemas ao excluir o lançamento !');
          }
        );
      } else {
        this.notify('Problemas ao excluir o lancamento !');
      }
      this.router.navigateByUrl('lancamentos/delete');
    } else {
      this.notify('Favor verificar preenchimento das informações.');
    }
  }

  notify(msg: string) {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  }

  cancel(): void {
    this.router.navigate(['/lancamentos']);
  }
}
