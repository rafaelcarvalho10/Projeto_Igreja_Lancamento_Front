import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-lancamento-crud',
  templateUrl: './lancamento-crud.component.html',
  styleUrls: ['./lancamento-crud.component.css']
})
export class LancamentoCrudComponent implements OnInit {

  propLegal = "qualquer"

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //ao clicar no botão que esta no HTML, ele executa essa função e navega para essa URL
  navigateToLancamentoCreate(): void {
    this.router.navigate(['/lancamentos/create'])
  }

}
