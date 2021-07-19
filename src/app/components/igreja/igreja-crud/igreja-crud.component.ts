import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-igreja-crud',
  templateUrl: './igreja-crud.component.html',
  styleUrls: ['./igreja-crud.component.css'],
})
export class IgrejaCrudComponent implements OnInit {
  propLegal = 'qualquer';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  //ao clicar no botão que esta no HTML, ele executa essa função e navega para essa URL
  navigateToIgrejaCreate(): void {
    this.router.navigate(['/igrejas/create']);
  }
}
