import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // biblioteca para fazer os formularios
import { HttpClient } from '@angular/common/http'; // biblioteca para fazer as requisicoes a API
import { ActivatedRoute } from '@angular/router'; // biblioteca para fazer podermos mapear as Rotas
import { identifierName } from '@angular/compiler';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-empresas-edicao',
  templateUrl: './empresas-edicao.component.html',
  styleUrls: ['./empresas-edicao.component.css']
})
export class EmpresasEdicaoComponent implements OnInit {

  mensagem: string = '';


  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {  }

  ngOnInit(): void {
    //capturando o id enviado na URL (pela Rota)
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    //consultar os dados da empresa na API através do id
    this.httpClient.get(environment.apiUrl + 'api/empresas/' + id)
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

   //formCadastro é o nome que eu dei para este formulario
   formEdicao = new FormGroup({
      idEmpresa: new FormControl('', [Validators.required]),
      nomeFantasia: new FormControl('', [Validators.required]),
      razaoSocial: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]) // '' indica valor inicial vazio,
});

//função para acessar os campos do formulário
get form(): any {
    return this.formEdicao.controls;
}
  // no onSubmit() do botão do formulario, esta funcão será chamada fazendo a atualização do registro
  onSubmit(): void {

    this.httpClient.put(
      environment.apiUrl + 'api/empresas/',
      this.formEdicao.value,
    { responseType: 'text' }
  )
  .subscribe({
      next: (result) => {
        this.mensagem = result;
      },
    error: (e) => {
        this.mensagem = "Falha ao atualizar empresa.";
      }
    })
  }

}
