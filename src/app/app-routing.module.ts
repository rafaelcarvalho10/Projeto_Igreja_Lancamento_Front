import { PaginaLoginComponent } from './components/pages/pagina-login/pagina-login.component';
import { LancamentoCrudComponent } from './views/lancamento-crud/lancamento-crud.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './views/home/home.component';
import {LancamentoCreateComponent} from './components/lancamento/lancamento-create/lancamento-create.component'
import { IgrejaCrudComponent } from './components/igreja/igreja-crud/igreja-crud.component';
import { IgrejaCreateComponent } from './components/igreja/igreja-create/igreja-create.component';
import { UsuarioCrudComponent } from './components/usuario/usuario-crud/usuario-crud.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { LancamentoUpdateComponent } from './components/lancamento/lancamento-update/lancamento-update.component';
import { PaginaHeaderComponent } from './components/pages/pagina-header/pagina-header.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { IgrejaUpdateComponent } from './components/igreja/igreja-update/igreja-update.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { IgrejaDeleteComponent } from './components/igreja/igreja-delete/igreja-delete.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { LancamentoDeleteComponent } from './components/lancamento/lancamento-delete/lancamento-delete.component';
// import { HomeComponent } from './views/home/home.component';
// import { HeaderComponent } from './components/template/header/header.component';
// import { LoginComponent } from './components/template/login/login.component';

const routes: Routes = [
  {path: "login", component: PaginaLoginComponent},
  {
      path: "", component: PaginaHeaderComponent, children: [
          {path: "lancamentos", component: LancamentoCrudComponent, canActivate: [AuthGuard],},
          {path: "lancamentos/update/:id", component: LancamentoUpdateComponent, canActivate: [AuthGuard]},
          {path: "lancamentos/delete/:id", component: LancamentoDeleteComponent, canActivate: [AuthGuard]},
          {path: "lancamentos/create", component: LancamentoCreateComponent, canActivate: [AuthGuard]},
          {path: "igrejas", component: IgrejaCrudComponent, canActivate: [AuthGuard]},
          {path: "igrejas/create", component: IgrejaCreateComponent, canActivate: [AuthGuard]},
          {path: "igrejas/update/:id", component: IgrejaUpdateComponent, canActivate: [AuthGuard]},
          {path: "igrejas/delete/:id", component: IgrejaDeleteComponent, canActivate: [AuthGuard]},
          {path: "usuarios", component: UsuarioCrudComponent, canActivate: [AuthGuard]},
          {path: "usuarios/create", component: UsuarioCreateComponent, canActivate: [AuthGuard]},
          {path: "usuarios/update/:id", component: UsuarioUpdateComponent, canActivate: [AuthGuard]},
          {path: "usuarios/delete/:id", component: UsuarioDeleteComponent, canActivate: [AuthGuard]},
     ],
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
