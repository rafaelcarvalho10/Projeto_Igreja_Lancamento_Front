import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IgrejaService } from '../igreja.service';

@Component({
  selector: 'app-igreja-update',
  templateUrl: './igreja-update.component.html',
  styleUrls: ['./igreja-update.component.css'],
})
export class IgrejaUpdateComponent implements OnInit {
  public igrejaForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    cod_igreja: new FormControl(null, [Validators.required]),
    nome_igreja: new FormControl(null, [Validators.required]),
  });

  @ViewChild('form') form: NgForm | undefined;

  constructor(
    private igrejaService: IgrejaService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    // getToken(): string | null {

    if (id) {
      this.igrejaService.readId(`${id}`).subscribe((resp) => {
        debugger;
        this.igrejaForm.setValue(resp);
      });
    }
  }

  save() {
    if (this.igrejaForm.valid) {
      let data = this.igrejaForm.value;
      if (data.id != null) {
        this.igrejaService
          .put(data.id, data.cod_igreja, data.nome_igreja)
          .subscribe(
            (Igreja) => this.notify('Registro atualizado !'),
            (error) => {
              console.log(error);
              this.notify('Problemas ao salvar o registro !');
            }
          );
      } else {
        this.igrejaService.create(data.cod_igreja, data.nome_igreja).subscribe(
          (igreja) => this.notify('Registro criado com sucesso !'),
          (error) => {
            console.log(error);
            this.notify('Problemas ao criar o registro !');
          }
        );
      }

      this.router.navigateByUrl('igrejas/update');
    } else {
      this.notify('Favor verificar preenchimento das informações.');
    }
  }

  notify(msg: string) {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  }

  cancel(): void {
    this.router.navigate(['/igrejas']);
  }
}
