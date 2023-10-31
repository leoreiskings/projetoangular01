import { Injectable } from "@angular/core";

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {

    //verificar se o angular está fazendo requisição para os serviços de /api/empresas ou /api/funcionarios
    if (request.url.includes("api/empresas") || request.url.includes("api/funcionarios")) {

      //pegando o token salvo na localstorage
      var accessToken = localStorage.getItem('access_token');

      //enviando o token para a API
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return next.handle(request);
  }
}
