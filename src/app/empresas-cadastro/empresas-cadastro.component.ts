//importando as bibliotecas da Classe
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empresas-cadastro',
  templateUrl: './empresas-cadastro.component.html',
  styleUrls: ['./empresas-cadastro.component.css']
})
// tornando a classe EmpresasCadastroComponent publica com a declaração do 'export'
export class EmpresasCadastroComponent implements OnInit {

  mensagem: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  //criando a estrutura do formulário
  formCadastro = new FormGroup({
    //o nome dos campos tem que ser iguais aos nomes que estao na API
    nomeFantasia: new FormControl('', [Validators.required]),
    razaoSocial: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required])

  });

  //função para acessar os campos do formulário
  //retorna todos os campos do formulario que esta atrelado
  get form(): any {
    return this.formCadastro.controls;
  }

  //função para ser executada no SUBMIT do formulário
  onSubmit(): void {
    //Requisição HTTP POST (cadastro)
    this.httpClient.post('http://localhost:8080/api/empresas', //ENDPOINT da API
    this.formCadastro.value, //dados que serão enviados
    { responseType: 'text' } //tipo de resposta que será obtida
    )
      .subscribe({ //capturar a resposta obtida da API

        next: (result) => { //retorno de sucesso da API
          this.mensagem = result;
          this.formCadastro.reset();
        },
        error: (e) => { //retorno de erro da API
          this.mensagem = "Falha ao cadastrar empresa.";
        }

      })
  }
}
