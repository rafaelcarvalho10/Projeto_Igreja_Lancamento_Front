import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-crud',
  templateUrl: './usuario-crud.component.html',
  styleUrls: ['./usuario-crud.component.css'],
})
export class UsuarioCrudComponent implements OnInit {
  propLegal = 'qualquer';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  //ao clicar no botão que esta em HTML, ele  executa essa função e navega para essa URL
  navigateToUsuarioCreate(): void {
    this.router.navigate(['usuarios/create']);
  }
}
