import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-empresas-consulta',
  templateUrl: './empresas-consulta.component.html',
  styleUrls: ['./empresas-consulta.component.css']
})
export class EmpresasConsultaComponent implements OnInit {

  //declarando um array jason de 'empresas' vazio
  empresas: any[] = [];
  mensagem: string = '';


  constructor(
    private httpClient: HttpClient
  ) { }

  //vai carregar as empresas ao abrir a pagina
  //essa funcao carrega antes da pagina ser carregada
  ngOnInit(): void {
    //Requisição HTTP GET (consulta)
    this.httpClient.get(environment.apiUrl + 'api/empresas')
      .subscribe({//recuperando o retorno da API

        next: (result) => { //retorno de erro da API
          this.empresas = result as any[]; //armazenando no array jason de empresas
        },
        error: (e) => {
          console.log(e);
        }

      })
  }

  onDelete(idEmpresa: number): void {

    if (window.confirm('Deseja realmente excluir esta Empresa?')) {

      this.httpClient.delete(environment.apiUrl + 'api/empresas/' + idEmpresa,
        { responseType: 'text' })//ENDPOINT da API
        .subscribe({
          next: (result) => {
            this.mensagem = result;
            this.ngOnInit(); // executando o metodo que carrega as empresas na pagina apos a deleção de 1 registro
          },
          error: (e) => {
            this.mensagem = 'Não foi possível excluir a Empresa. Verifique se ela possui funcionários.';
          }
        })
    }
  }
}
