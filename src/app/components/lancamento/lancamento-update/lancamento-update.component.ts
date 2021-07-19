import { Lancamento } from './../lancamento.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LancamentoService } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-lancamento-update',
  templateUrl: './lancamento-update.component.html',
  styleUrls: ['./lancamento-update.component.css'],
})
export class LancamentoUpdateComponent implements OnInit {
  public lancamentoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    cod_lancamento: new FormControl(null, [Validators.required]),
    data_Lancamento: new FormControl(null),
    qtd_pessoas: new FormControl(null),
    vl_oferta: new FormControl(null),
    qtd_dizimistas: new FormControl(null),
    vl_total_dizimos: new FormControl(null),
    igrejaId: new FormControl(null),
  });

  @ViewChild('form') form: NgForm | undefined;

  constructor(
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
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

  save() {
    if (this.lancamentoForm.valid) {
      debugger;
      let data = this.lancamentoForm.value;
      if (data.id != null) {
        this.lancamentoService.put(data).subscribe(
          (Lancamento) => this.notify('Registro atualizado !'),
          (error) => {
            console.log(error);
            this.notify('Problemas ao atualizar o registro !');
          }
        );
      } else {
        this.lancamentoService.put(data).subscribe(
          (Lancamento) => this.notify('Registro atualizado  !'),
          (error) => {
            console.log(error);
            this.notify('Problemas ao atualizar o registro !');
          }
        );
      }

      // this.resetForm();
      this.router.navigateByUrl('lancamentos/update');
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
