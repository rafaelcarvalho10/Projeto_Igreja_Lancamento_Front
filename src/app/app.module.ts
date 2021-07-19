import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './components/template/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './views/home/home.component';
import { LancamentoCrudComponent } from './views/lancamento-crud/lancamento-crud.component';
import { ForDirective } from './directives/for.directive';
import { LancamentoCreateComponent } from './components/lancamento/lancamento-create/lancamento-create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IgrejaCrudComponent } from './components/igreja/igreja-crud/igreja-crud.component';
import { IgrejaCreateComponent } from './components/igreja/igreja-create/igreja-create.component';
import { UsuarioCrudComponent } from './components/usuario/usuario-crud/usuario-crud.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { LancamentoReadComponent } from './components/lancamento/lancamento-read/lancamento-read.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

import { registerLocaleData } from '@angular/common';
import { LancamentoUpdateComponent } from './components/lancamento/lancamento-update/lancamento-update.component';
import { LancamentoDeleteComponent } from './components/lancamento/lancamento-delete/lancamento-delete.component';
import { PaginaHeaderComponent } from './components/pages/pagina-header/pagina-header.component';
import { PaginaLoginComponent } from './components/pages/pagina-login/pagina-login.component';
import { IgrejaReadComponent } from './components/igreja/igreja-read/igreja-read.component';
import { UsuarioReadComponent } from './components/usuario/usuario-read/usuario-read.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { IgrejaUpdateComponent } from './components/igreja/igreja-update/igreja-update.component';
import { IgrejaDeleteComponent } from './components/igreja/igreja-delete/igreja-delete.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';

import localePt from '@angular/common/locales/pt';
import { Globals } from './shared/helpers/globals';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    LancamentoCrudComponent,
    ForDirective,
    LancamentoCreateComponent,
    IgrejaCrudComponent,
    IgrejaCreateComponent,
    UsuarioCrudComponent,
    UsuarioCreateComponent,
    LancamentoReadComponent,
    LancamentoUpdateComponent,
    LancamentoDeleteComponent,
    PaginaHeaderComponent,
    PaginaLoginComponent,
    IgrejaReadComponent,
    UsuarioReadComponent,
    UsuarioUpdateComponent,
    IgrejaUpdateComponent,
    IgrejaDeleteComponent,
    UsuarioDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    MatCheckboxModule,
    FlexLayoutModule,
  ],
  providers: [
    Globals,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export class Module {}
