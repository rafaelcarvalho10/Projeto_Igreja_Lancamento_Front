import { IgrejaService } from './../igreja.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-igreja-create',
  templateUrl: './igreja-create.component.html',
  styleUrls: ['./igreja-create.component.css'],
})
export class IgrejaCreateComponent implements OnInit {
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
        this.igrejaForm.setValue(resp[0]);
      });
    }
  }

  // createIgreja(): void {
  //   this.igrejaService.create(this.igreja).subscribe(() => {
  //     this.igrejaService.showMessageIgreja('Igreja cadastrada com sucesso !')
  //     this.router.navigate(['/igrejas'])
  //   })
  // }

  save() {
    if (this.igrejaForm.valid) {
      let data = this.igrejaForm.value;
      if (data.id != null) {
        this.igrejaService
          .put(data.id, data.cod_igreja, data.nome_igreja)
          .subscribe(
            (Igreja) => this.notify('Registro salvo com sucesso !'),
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

      // this.resetForm();
      this.router.navigateByUrl('igrejas/create');
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
