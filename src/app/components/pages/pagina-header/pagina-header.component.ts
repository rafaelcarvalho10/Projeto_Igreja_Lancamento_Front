import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-pagina-header',
  templateUrl: './pagina-header.component.html',
  styleUrls: ['./pagina-header.component.css']
})
export class PaginaHeaderComponent implements OnInit {

  constructor(public _authService: AuthService) { }

  ngOnInit(): void {
  }

}
