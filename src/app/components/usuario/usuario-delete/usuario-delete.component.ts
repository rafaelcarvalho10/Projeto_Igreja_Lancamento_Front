import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {

  public usuarioForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    role: new FormControl(null)
  })

  @ViewChild('form') form: NgForm | undefined;

  constructor(private usuarioService: UsuarioService,
               private router: Router,
               private route: ActivatedRoute,
               private snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id")!);

    if(id){
      this.usuarioService.readId(`${id}`).subscribe((resp) => {
        this.usuarioForm.setValue(resp);
      })
    }
  }

  deleteUsuario(): void{
    if(this.usuarioForm.valid){
      let data = this.usuarioForm.value;
      if(data.id != null) {
        this.usuarioService.delete(data.id).subscribe(
          (Usuario) => this.notify("usuario excluído"),
          (error) => {
            console.log(error);
            this.notify("Problemas ao excluir  o usuário !");
          }
        );
      } else {
            this.notify("Problemas ao excluir o usuário !");
      }
      this.router.navigateByUrl("usuarios/delete");
    } else {
      this.notify("Favor verificar preenchimento das informações.");
    }
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 });
  }

  cancel(): void {
    this.router.navigate(['/usuarios'])
  }

}

