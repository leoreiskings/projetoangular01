import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empresas-consulta',
  templateUrl: './empresas-consulta.component.html',
  styleUrls: ['./empresas-consulta.component.css']
})
export class EmpresasConsultaComponent implements OnInit {

  //atributo
  empresas: any[] = [];
  mensagem: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    //ao ser carregado, ele já executa a chamada ao metodo get da API trazendo todas as empresas cadastradas
    this.httpClient.get(environment.apiUrl + 'api/empresas')
    .subscribe({
      next: (result) => {
        this.empresas = result as any[];
      },
       error: (e) => {
          console.log(e);
        }
    })
  }

  onDelete(idEmpresa: number): void {

    if (window.confirm('Deseja realmente excluir esta empresa?')) {

      this.httpClient.delete(environment.apiUrl + '/api/empresas/' + idEmpresa,
       { responseType: 'text' })
        .subscribe({
          next: (result) => {
            this.mensagem = result;
            this.ngOnInit(); // apos excluir, chama o metodo e carrega novamente as Empresas cadastradas, atualizando a tela de empresas cadastradas
          },
          error: (e) => {
            this.mensagem = 'Não foi possivel excluir a empresa. Verifique se ela possui Funcionários cadastrados.';
          }

        })
      }
    }

}
