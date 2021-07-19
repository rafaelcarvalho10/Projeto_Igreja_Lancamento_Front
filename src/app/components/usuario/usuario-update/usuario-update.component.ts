import { IgrejaService } from './../../igreja/igreja.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { IgrejaUsuario } from '../igrejaUsuario.model';
import { numberFormat } from 'highcharts';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css'],
})
export class UsuarioUpdateComponent implements OnInit {
  igrejas: any[] = [];
  igrejaUsuario: IgrejaUsuario[] = [];

  public usuarioForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    igrejaUsuario: new FormControl(null),
  });

  public igreja_usuarioForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    igrejaId: new FormControl(null, [Validators.required]),
    userId: new FormControl(null, [Validators.required]),
  });

  @ViewChild('form') form: NgForm | undefined;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private igrejaService: IgrejaService
  ) {}

  ngOnInit(): void {
    debugger;
    this.igrejaService.read().subscribe((h) => (this.igrejas = h));

    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    if (id) {
      this.usuarioService.readId(`${id}`).subscribe((resp) => {
        this.usuarioForm.setValue(resp);
      });
    }
  }

  onChange(id: number, checked: boolean) {
    if (checked) {
      let i = new IgrejaUsuario();
      i.igrejaId = id;
      this.igrejaUsuario.push(i);
    } else if (checked == false) {
      let i = new IgrejaUsuario();
      i.igrejaId = id;
      this.igrejaUsuario.pop();
    }
  }

  save() {
    if (this.usuarioForm.valid) {
      let data = this.usuarioForm.value;
      if (data.id != null) {
        let igrejaUsuario = Array<IgrejaUsuario>();

        this.igrejaService.read().subscribe((h) => (this.igrejas = h));

        // this.igrejas.map(function (value) {
        //   debugger;
        //   let i = new IgrejaUsuario();
        //   i.igrejaId = 1;
        //   igrejaUsuario.push(i);
        // });

        this.usuarioService
          .put(
            data.id,
            data.username,
            data.password,
            data.role,
            this.igrejaUsuario
          )
          .subscribe(
            (Usuario) => this.notify('Registro atualizado !'),
            (error) => {
              console.log(error);
              this.notify('Problemas ao salvar o registro !');
            }
          );
      }
      // this.resetForm();
      this.router.navigateByUrl('usuarios/update');
    } else {
      this.notify('Favor verificar preenchimento das informações.');
    }
  }

  notify(msg: string) {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  }

  cancel(): void {
    this.router.navigate(['/usuarios']);
  }
}
