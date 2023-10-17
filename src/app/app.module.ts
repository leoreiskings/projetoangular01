import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmpresasCadastroComponent } from './empresas-cadastro/empresas-cadastro.component';
import { EmpresasConsultaComponent } from './empresas-consulta/empresas-consulta.component';
import { EmpresasEdicaoComponent } from './empresas-edicao/empresas-edicao.component';
import { FuncionariosCadastroComponent } from './funcionarios-cadastro/funcionarios-cadastro.component';
import { FuncionariosConsultaComponent } from './funcionarios-consulta/funcionarios-consulta.component';
import { FuncionariosEdicaoComponent } from './funcionarios-edicao/funcionarios-edicao.component';

const routes : Routes = [
  {path : 'empresas-cadastro', component: EmpresasCadastroComponent },
  {path : 'empresas-consulta', component: EmpresasConsultaComponent },
  {path : 'empresas-edicao/:id', component: EmpresasEdicaoComponent },
  {path : 'funcionarios-cadastro', component: FuncionariosCadastroComponent },
  {path : 'funcionarios-consulta', component: FuncionariosConsultaComponent },
  {path : 'funcionarios-edicao/:id', component: FuncionariosEdicaoComponent }
]




@NgModule({
  declarations: [
    AppComponent,
    EmpresasCadastroComponent,
    EmpresasConsultaComponent,
    EmpresasEdicaoComponent,
    FuncionariosCadastroComponent,
    FuncionariosConsultaComponent,
    FuncionariosEdicaoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // ativando as rotas
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
