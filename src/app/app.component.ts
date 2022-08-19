import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

//atributo criado para verificar se existe um usuario autenticado
usuarioAutenticado: boolean = false;

//atributo criado para capturar o email do usuario autenticado na local storage
usuarioEmail: string = '';

constructor(){

  //se existe um token salvo na local storage entra e altera o valor da variavel para true
  //e depois armazena o email que tambem foi enviado para a Local Storage
   if(localStorage.getItem("access_token") != null) {

    this.usuarioAutenticado = true;
    this.usuarioEmail = localStorage.getItem("email_usuario") as string;

  }
}

  //função para realizar o logout do usuário
  logout() : void {
    if(window.confirm('Deseja realmente sair do sistema?')) {

      //apagar os dados salvos na local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('email_usuario');

      //redirecionar de volta para a página de login
      window.location.href = "/login";
      }
  }


}
