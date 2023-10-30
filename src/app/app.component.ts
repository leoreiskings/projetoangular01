import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //atributo
  usuarioAutenticado: boolean = false;
  usuarioEmail: string = '';

  //construtor
  constructor() {
    //verificar se existe um token salvo na local storage
    if (localStorage.getItem("access_token") != null) {
      this.usuarioAutenticado = true;
      this.usuarioEmail = localStorage.getItem("email_usuario") as string;
    }
  }

  //função para realizar o logout do usuário
  logout(): void {

    if (window.confirm('Deseja realmente sair do sistema?')) {

      //apagar os dados salvos na local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('email_usuario');

      //redirecionar de volta para a página de login
      window.location.href = "/login";

    }

  }

}
