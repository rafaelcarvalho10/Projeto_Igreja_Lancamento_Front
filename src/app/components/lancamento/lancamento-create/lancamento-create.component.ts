import { Lancamento } from './../lancamento.model';
import { LancamentoService } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IgrejaService } from '../../igreja/igreja.service';

@Component({
  selector: 'app-lancamento-create',
  templateUrl: './lancamento-create.component.html',
  styleUrls: ['./lancamento-create.component.css'],
})
export class LancamentoCreateComponent implements OnInit {
  public lancamentoForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    cod_lancamento: new FormControl(null, [Validators.required]),
    data_Lancamento: new FormControl(null, [Validators.required]),
    qtd_pessoas: new FormControl(null),
    vl_oferta: new FormControl(null),
    qtd_dizimistas: new FormControl(null),
    vl_total_dizimos: new FormControl(null),
    igrejaId: new FormControl(null),
  });

  igrejas: any[] = [];

  @ViewChild('form') form: NgForm | undefined;

  //importei (injeção) o service, agora posso usar a função que fiz no service
  constructor(
    private lancamentoService: LancamentoService,
    private igrejaService: IgrejaService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.igrejaService.read().subscribe((h) => (this.igrejas = h));

    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    // getToken(): string | null {

    if (id) {
      this.lancamentoService.readById(`${id}`).subscribe((resp) => {
        this.lancamentoForm.setValue(resp);
      });
    }
  }

  // createLancamento(): void {
  //   this.lancamentoService.create(this.lancamento).subscribe(() => {
  //     this.lancamentoService.showMessage('Lancamento realizado')
  //     this.router.navigate(['/lancamentos'])
  //   })

  // }

  save() {
    if (this.lancamentoForm.valid) {
      debugger;
      let data = this.lancamentoForm.value;
      if (data.id != null) {
        this.lancamentoService.create(data).subscribe(
          (Lancamento) => this.notify('Registro salvo com sucesso !'),
          (error) => {
            console.log(error);
            this.notify('Problemas ao salvar o registro !');
          }
        );
      } else {
        this.lancamentoService.create(data).subscribe(
          (Lancamento) => this.notify('Registro criado com sucesso !'),
          (error) => {
            console.log(error);
            this.notify('Problemas ao criar o registro !');
          }
        );
      }
      // this.resetForm();
      this.router.navigateByUrl('lancamentos/create');
    } else {
      this.notify('Favor verificar preenchimento das informações.');
    }
  }

  notify(msg: string) {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  }

  // resetForm() {
  //   this.form.resetForm();
  // }

  cancel(): void {
    this.router.navigate(['/lancamentos']);
  }
}
