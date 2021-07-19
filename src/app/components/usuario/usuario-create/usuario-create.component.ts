import { Igreja } from 'src/app/components/igreja/igreja.model';
import { IgrejaUsuario } from './../igrejaUsuario.model';
import { IgrejaService } from './../../igreja/igreja.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css'],
})
export class UsuarioCreateComponent implements OnInit {
  igrejas: any[] = [];
  igrejaUsuario: IgrejaUsuario[] = [];

  public usuarioForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
  });

  public igreja_usuarioForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    igrejaId: new FormControl(null, [Validators.required]),
    userId: new FormControl(null, [Validators.required]),
  });

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private igrejaService: IgrejaService
  ) {}

  ngOnInit(): void {
    this.igrejaService.read().subscribe((h) => (this.igrejas = h));

    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
  }

  onChange(id: number, checked: boolean) {
    debugger;
    if (checked) {
      let i = new IgrejaUsuario();
      i.igrejaId = id;
      this.igrejaUsuario.push(i);
    } else {
      this.igrejaUsuario = this.igrejaUsuario.filter(function (ele) {
        return ele.igrejaId != id;
      });
      // this.igrejaUsuario.pop();
    }
  }

  save() {
    if (this.usuarioForm.valid) {
      let data = this.usuarioForm.value;
      if (data.id == null) {
        let igrejaUsuario = Array<IgrejaUsuario>();

        this.igrejaService.read().subscribe((h) => (this.igrejas = h));

        const id = parseInt(this.route.snapshot.paramMap.get('id')!);

        this.usuarioService
          .create(data.username, data.password, data.role, this.igrejaUsuario)
          .subscribe(
            (Igreja) => this.notify('Registro salvo com sucesso !'),
            (error) => {
              console.log(error);
              this.notify('Problemas ao salvar o registro !');
            }
          );
      }
      this.router.navigateByUrl('usuarios/create');
    } else {
      this.notify('Favor verificar preenchimento das informações.');
    }
  }

  createIgrejaUser() {}

  notify(msg: string) {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  }

  cancel(): void {
    this.router.navigate(['/usuarios']);
  }
}
