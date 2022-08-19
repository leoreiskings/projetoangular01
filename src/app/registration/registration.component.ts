import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  mensagem: string = ''; // atributo para exibir msg de retorno da API


  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  formRegistration = new FormGroup(
    {
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      senhaConfirmacao: new FormControl('', [Validators.required]),
    }
  );

  get form(): any {
    return this.formRegistration.controls;
  }
  //metodo que sera chamado no onsubmit do formulario que envia os valores do formulario para essa pagina que fica em background
  //ela faz a captura de valores e chama os metodos da API 'api/registration' a API chama o controller da pagina e a seguir os metodos de gravacao em banco
  //devolve um json para ser exibido na pagina
  onSubmit(): void {

    this.httpClient.post(
      //mandando os dados do formulario para a API
      environment.apiLoginUrl + "api/registration",
      this.formRegistration.value,
      { responseType: 'text' }
    )
      .subscribe({
        next: (result) => {
          this.mensagem = result;
          this.formRegistration.reset();
        },
        error: (e) => {
          this.mensagem = e.error;
        }
      })
  }
}
