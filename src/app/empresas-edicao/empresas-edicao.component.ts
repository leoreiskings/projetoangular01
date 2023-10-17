import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empresas-edicao',
  templateUrl: './empresas-edicao.component.html',
  styleUrls: ['./empresas-edicao.component.css']
})

export class EmpresasEdicaoComponent implements OnInit {

  //atributo
  mensagem: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //capturar o id enviado na URL (ROTA)
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    //consultar os dados da empresa na API através do id
    this.httpClient.get('http://localhost:8080/api/empresas/' + id)
      .subscribe({
        next: (result) => {
          //preencher o formulário com os dados da empresa
          this.formEdicao.patchValue(result);
        },
        error: (e) => {
          console.log(e);
        }
      });
  }

  //criando a estrutura do formulário
  formEdicao = new FormGroup({

    idEmpresa: new FormControl('', [Validators.required]),
    nomeFantasia: new FormControl('', [Validators.required]),
    razaoSocial: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required])

  });

  //função para acessar os campos do formulário
  get form(): any {
    return this.formEdicao.controls;
  }

  //função para executar o submit do formulário
  onSubmit(): void {

    this.httpClient.put( //Requisição HTTP PUT (edição)
      'http://localhost:8080/api/empresas', //ENDPOINT da API
      this.formEdicao.value, //dados que serão enviados
      { responseType: 'text' } //tipo de resposta que será obtida
    )
      .subscribe({ //capturar a resposta obtida da API
        next: (result) => { //retorno de sucesso da API
          this.mensagem = result;
        },
        error: (e) => { //retorno de erro da API
          this.mensagem = "Falha ao atualizar empresa.";
        }
      })
  }
}
