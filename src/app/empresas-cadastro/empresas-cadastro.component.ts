import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empresas-cadastro',
  templateUrl: './empresas-cadastro.component.html',
  styleUrls: ['./empresas-cadastro.component.css']
})
export class EmpresasCadastroComponent implements OnInit {

  //atributo que será utilizado para exibir a msg de retorno da chamada na API
  mensagem: string = '';

  constructor(
    private httpClient: HttpClient // nome : tipo
  ) {  }

  ngOnInit(): void {
  }

  /*  criando a estrutura do formulário para regastar os valores a serem enviados para a API.
    Aqui temos que saber quais campos a API está esperando que sejam enviados para que ela retorne os dados do BD   */

    //formCadastro é o nome que eu dei para este formulario
    formCadastro = new FormGroup({
        nomeFantasia: new FormControl('', [Validators.required]),
        razaoSocial: new FormControl('', [Validators.required]),
        cnpj: new FormControl('', [Validators.required]) // '' indica valor inicial vazio,
    });

    //função para acessar os campos do formulário
    get form(): any {
        return this.formCadastro.controls;
    }

    //função que será executada ao se clicar no botão SUBMIT do formulário "formCadastro"
    onSubmit(): void {

      this.httpClient.post(
        environment.apiUrl + 'api/empresas',
        this.formCadastro.value,
        { responseType: 'text' }
      )
      .subscribe({
           next: (result) => {
            this.mensagem = result;
            this.formCadastro.reset(); // limpa o formulario apos cadastrar a Empresa e exibir a msg de sucesso
          },
        error: (e) => {
            this.mensagem = "Falha ao cadastrar empresa.";
          }
      })
    }
}
