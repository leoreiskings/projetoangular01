import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-funcionarios-cadastro',
  templateUrl: './funcionarios-cadastro.component.html',
  styleUrls: ['./funcionarios-cadastro.component.css']
})
export class FuncionariosCadastroComponent implements OnInit {

  empresas : any[] = []; // declarando o atributo empresas, que é um array vazio. Este será usado para popular o "select" de empresas
  mensagem: string = ''; //atributo que será utilizado para exibir a msg de retorno da chamada na API

  constructor(
    private httpClient: HttpClient
  ) {  }

//criando a estruturta do formulario
formCadastro = new FormGroup({

  nome: new FormControl('', [Validators.required]),
  cpf: new FormControl('', [Validators.required]),  // aspas simples aqui indica valor inicial vazio,
  matricula: new FormControl('', [Validators.required]),
  dataAdmissao: new FormControl('', [Validators.required]),
  idEmpresa: new FormControl('', [Validators.required]),
});

//função para acessar os campos do formulário
get form(): any {
  return this.formCadastro.controls;
}

  ngOnInit(): void {
    //a consulta que será feita trará um lista de empresas que irá popular o array empresas declarado acima
    this.httpClient.get(environment.apiUrl + "api/empresas")

    //pegando o retorno da API, se foi sucesso ou erro
    .subscribe(
      {//sucesso
        next: (result) => {
          this.empresas = result as any[];
        },
        //erro
        error: (e) => {
          console.log(e);
        }
      }
    )
  }

  //função que será executada ao se clicar no botão SUBMIT do formulário "formCadastro"
  onSubmit(): void {

    this.httpClient.post(
      environment.apiUrl + 'api/funcionarios',
      this.formCadastro.value,
      { responseType: 'text' }
    )
    .subscribe(
      {
        // devolve a msg em caso de sucesso
        next: (result) => {
          this.mensagem = result;
          this.formCadastro.reset(); // limpa o formulario apos cadastrar a Empresa e exibir a msg de sucesso
        },
        // devolve a msg em caso de erro
        error: (e) => {
          console.log(e);
          this.mensagem = "Falha ao cadastrar funcionário.";
        }
      }
    )
  }

}
