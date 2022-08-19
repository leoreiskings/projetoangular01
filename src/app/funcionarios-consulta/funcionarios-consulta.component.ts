import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; // arquivo que guarda o mapeamento das chamada a API
                                                            // apiUrl: 'http://localhost:8090/'

@Component({
  selector: 'app-funcionarios-consulta',
  templateUrl: './funcionarios-consulta.component.html',
  styleUrls: ['./funcionarios-consulta.component.css']
})

export class FuncionariosConsultaComponent implements OnInit {

  //atributo
  funcionarios: any[] = []; // criando um array jason de funcionarios que irá receber o retorno da consulta a lista de funcionarios
  mensagem: string = '';

  constructor(
    private httpClient: HttpClient // atraves desta biblioteca são feitas as chamadas a API
  ) { }

  ngOnInit(): void {
     //ao ser carregado, ele já executa a chamada ao metodo get da API trazendo todos os funcionarios cadastrados
     this.httpClient.get(environment.apiUrl + 'api/funcionarios')
     .subscribe(
       {
          next: (result) => {
            this.funcionarios = result as any[]; // jason array de funcionarios "this.funcionarios"
                                                 // recebendo o retorno da lista de funcionarios
          },
          error: (e) => {
            console.log(e);
          }
     })
  }

  onDelete(idFuncionario: number): void {

    if (window.confirm('Deseja realmente excluir este funcionarios?')) {

      this.httpClient.delete(environment.apiUrl + '/api/funcionarios/' + idFuncionario,
       { responseType: 'text' })
        .subscribe({
          next: (result) => {
            this.mensagem = result;
            this.ngOnInit(); // apos excluir, chama o metodo e carrega novamente os funcionarios cadastrados, atualizando a tela de funcionarios cadastrados
          },
          error: (e) => {
            this.mensagem = 'Não foi possivel excluir o funcionario.';
          }

        })
      }
    }

}
