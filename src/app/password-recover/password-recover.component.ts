import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.css']
})

export class PasswordRecoverComponent implements OnInit {

  mensagem: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  //estrutura do formulário
  formPasswordRecover = new FormGroup({
    email: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formPasswordRecover.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.httpClient.post(

      environment.apiLoginUrl + "api/password-recover",
      this.formPasswordRecover.value,

      { responseType: 'text' })
        .subscribe({
        next: (result) => {
          this.mensagem = result;
        },
        error: (e) => {
          this.mensagem = e.error;
        }
      })
  }

}
