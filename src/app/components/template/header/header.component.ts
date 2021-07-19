import { AuthService } from './../../../shared/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IgrejaService } from '../../igreja/igreja.service';
import { ActivatedRoute } from '@angular/router';
import { Igreja } from '../../igreja/igreja.model';
import { Globals } from 'src/app/shared/helpers/globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  igrejas: any[] = [];

  snackBar: any;

  @ViewChild('form') form: NgForm | undefined;

  constructor(
    private authService: AuthService,
    private igrejaService: IgrejaService,
    private route: ActivatedRoute,
    private globals: Globals
  ) {}

  ngOnInit(): void {
    this.igrejaService.read().subscribe((h) => (this.igrejas = h));

    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
  }

  trocarIgreja(igreja: Igreja) {
    this.globals.igrejaSelecionada$.next(igreja);
  }

  logout() {
    {
      this.snackBar.open('Até mais !', 'OK', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }
}
