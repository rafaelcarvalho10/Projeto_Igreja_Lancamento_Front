import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IgrejaService } from '../igreja.service';

@Component({
  selector: 'app-igreja-delete',
  templateUrl: './igreja-delete.component.html',
  styleUrls: ['./igreja-delete.component.css'],
})
export class IgrejaDeleteComponent implements OnInit {
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

    if (id) {
      this.igrejaService.readId(`${id}`).subscribe((resp) => {
        this.igrejaForm.setValue(resp);
      });
    }
  }

  deleteIgreja(): void {
    if (this.igrejaForm.valid) {
      let data = this.igrejaForm.value;
      if (data.id != null) {
        this.igrejaService.delete(data.id).subscribe(
          (Igreja) => this.notify('Igreja excluída'),
          (error) => {
            console.log(error);
            this.notify('Problemas ao excluir a igreja');
          }
        );
      } else {
        this.notify('Problemas ao excluir a igreja !');
      }
      this.router.navigateByUrl('igrejas/delete');
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
