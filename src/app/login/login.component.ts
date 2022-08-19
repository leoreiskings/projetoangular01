import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { windowCount } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagem: string = '';

  //instanciando o obj dentro do construtor
  constructor(
    private httpClient: HttpClient
  ) { }

  formLogin = new FormGroup({

    email: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required])

  });

  get form(): any {
    return this.formLogin.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.httpClient.post(
      environment.apiLoginUrl + "api/login",
      this.formLogin.value,
      { responseType: 'text' })
      .subscribe({
        next: (result) => {

          //salvando o TOKEN na local storage. Este "access_token", foi o nome dado ao TOKEN que será salvo na Local Storage
          //result armazena a msg de retorno da API
          localStorage.setItem("access_token", result);

          //salvando o email do usuario autenticado na local storage
          localStorage.setItem("email_usuario", this.formLogin.value.email as string);

          //redirecionando para a página de consulta de empresas do sistema
          window.location.href = "/empresas-consulta";


          //this.mensagem = result; // recebendo o retorno da msg de sucesso da API
          //this.formLogin.reset(); // limpando o formulario

      },
        error: (e) => {
          this.mensagem = e.error; // recebendo o retorno da msg de erro da API
        }
    })
  }
}
