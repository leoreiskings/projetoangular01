import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate() {

    //verificando se há um token de autorização na localstorage
    if (localStorage.getItem('access_token') != null) {
      return true;
    } else { //senao tiver um token de autorização expulsa o cara para a tela de login. è a mesma ideia do Filter usado no SpringMVC

      window.location.href = "/login";
      return false;
    }
  }
}
