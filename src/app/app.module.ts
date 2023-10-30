import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './_interceptors/token-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationGuard } from './_guards/AuthorizationGuard';

import { AppComponent } from './app.component';
import { EmpresasCadastroComponent } from './empresas-cadastro/empresas-cadastro.component';
import { EmpresasConsultaComponent } from './empresas-consulta/empresas-consulta.component';
import { EmpresasEdicaoComponent } from './empresas-edicao/empresas-edicao.component';
import { FuncionariosCadastroComponent } from './funcionarios-cadastro/funcionarios-cadastro.component';
import { FuncionariosConsultaComponent } from './funcionarios-consulta/funcionarios-consulta.component';
import { FuncionariosEdicaoComponent } from './funcionarios-edicao/funcionarios-edicao.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PasswordRecoverComponent } from './password-recover/password-recover.component';

//mapeamento de rotas
const routes: Routes = [
  { path : '', pathMatch: 'full', redirectTo : 'login' }, //elegendo esta pagina como a 1ª a ser carregada
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'password-recover', component: PasswordRecoverComponent },
  { path: 'empresas-cadastro', component: EmpresasCadastroComponent, canActivate: [AuthorizationGuard] },
  { path: 'empresas-consulta', component: EmpresasConsultaComponent , canActivate: [AuthorizationGuard] },
  { path: 'empresas-edicao/:id', component: EmpresasEdicaoComponent , canActivate: [AuthorizationGuard] },
  { path: 'funcionarios-cadastro', component: FuncionariosCadastroComponent, canActivate: [AuthorizationGuard] },
  { path: 'funcionarios-consulta', component: FuncionariosConsultaComponent, canActivate: [AuthorizationGuard] },
  { path: 'funcionarios-edicao/:id', component: FuncionariosEdicaoComponent, canActivate: [AuthorizationGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    EmpresasCadastroComponent,
    EmpresasConsultaComponent,
    EmpresasEdicaoComponent,
    FuncionariosCadastroComponent,
    FuncionariosConsultaComponent,
    FuncionariosEdicaoComponent,
    LoginComponent,
    RegistrationComponent,
    PasswordRecoverComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // ativando as rotas
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true // true nos habilita para criar outros interceptadores
      },
      AuthorizationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
