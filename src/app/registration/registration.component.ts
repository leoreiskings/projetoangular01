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

  mensagem: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  formRegistration = new FormGroup({ // formRegistration este é o nome do formulario que
                                    // está sendo referenciado na tag <form> do registration.component.html
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
    senhaConfirmacao: new FormControl('', [Validators.required]),
  });

  get form(): any {
    return this.formRegistration.controls;
  }

  onSubmit(): void {
    
    this.httpClient.post(
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
