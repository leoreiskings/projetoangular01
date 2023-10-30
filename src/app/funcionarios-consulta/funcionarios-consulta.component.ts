import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-funcionarios-consulta',
  templateUrl: './funcionarios-consulta.component.html',
  styleUrls: ['./funcionarios-consulta.component.css']
})

export class FuncionariosConsultaComponent implements OnInit {
  //atributos
  funcionarios: any[] = [];
  mensagem: string = '';
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.httpClient.get(environment.apiUrl + "api/funcionarios")
      .subscribe(
        {
          next: (result) => {
            this.funcionarios = result as any[];
          },
          error: (e) => {
            console.log(e);
          }
        }
      )
  }

  onDelete(idFuncionario: number): void {
    if (window.confirm('Deseja realmente excluir o funcionário selecionado ? ')) {
      this.httpClient.delete(environment.apiUrl + "api/funcionarios/" + idFuncionario,
        { responseType: 'text' })
        .subscribe(
          {
            next: (result) => {
              this.mensagem = result;
              this.ngOnInit();
            },
            error: (e) => {
              console.log(e);
              this.mensagem = "Falha ao excluir o funcionário.";
            }
          }
        )
    }
  }
}
