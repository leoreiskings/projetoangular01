import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagem: string = '';

  constructor(

    private httpClient: HttpClient

  ) { }
  
  //estrutura do formulário. formLogin é o nome do formulário login.component.html
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

          //salvando o TOKEN do usuario autenticado na local storage.. "access_token" é o nome do token criado
          localStorage.setItem("access_token", result);

          //salvando na local storage o email do usuario autenticado
          localStorage.setItem("email_usuario", this.formLogin.value.email as string);

          //redirecionando para a página de consulta de empresas do sistema apos estar autenticado
          window.location.href = "/empresas-consulta";

        },
        error: (e) => {
          this.mensagem = e.error;
        }
      })
  }
}
