import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // para montar o formulario
import { HttpClient } from '@angular/common/http';  // para podermos acessar a API
import { environment } from 'src/environments/environment'; // para podermos pegar o endereço da API

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.css']
})
export class PasswordRecoverComponent implements OnInit {

    // atributo criado para podermos pegar e exibir mensagens na tela que a API vai devolver
    mensagem: string = '';

    constructor(
      private httpClient: HttpClient
    ) { }

    //estrutura do formulário
    formPasswordRecover = new FormGroup({
      email: new FormControl('', [Validators.required]) // campos que iremos recuperar dentro do formulario (formPasswordRecover)
    });

  //função para acessarmos o formulario dentro da pagina
    get form(): any {
      return this.formPasswordRecover.controls;
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
      this.httpClient.post(
        environment.apiLoginUrl + "api/password-recover", // mandando o endereço da API que quero acessar
        this.formPasswordRecover.value, // enviando os dados do formulario. neste caso os campos já foram selecionados no inicio 'email'
        { responseType: 'text' }) // resposta da API que é do formato texto
        .subscribe({
          next: (result) => {
            this.mensagem = result; // o atributo mensagem recebe o retorno de sucesso da API
            this.formPasswordRecover.reset(); // limpando o formulario
          },
          error: (e) => {
            this.mensagem = e.error; // o atributo mensagem recebe o retorno de erro da API
          }
        })
    }



  }




