import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from 'src/models/login.model';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private readonly Api: string = `${environment.API}usuarios?email_like=`;

  constructor(private http: HttpClient,
    private router: Router) { }

  retornarUsuario(values: { email: string }) {
    console.log(values)
    return this.http.get<Login[]>(`${environment.API}user?email=` + values);

  }

  clear() {
    localStorage.clear();
  }

  isAuthenticated() {
    return (localStorage.getItem('user') !== null ? true : false);
  }

  login(usuario: Login): Observable<any> {
    return this.mockUsuarioLogin(usuario).pipe(tap((resposta) => {
      if (!resposta.sucesso) return;
      localStorage.setItem('token', btoa(JSON.stringify("TokenQueSeriaGeradoPelaAPI")));
      localStorage.setItem('usuario', btoa(JSON.stringify(usuario)));
      this.router.navigate(['feed-eventos']);
    }));
  }
  private mockUsuarioLogin(usuario: Login): Observable<any> {
    // this.http.get<Login[]>(`${environment.API}usuarios?email_like=` + usuario.email)
    var retornoMock: any = [];
    if (usuario.email === "usuario@gmail.com") {
      retornoMock.sucesso = true;
      retornoMock.usuario = usuario;
      retornoMock.token = "TokenQueSeriaGeradoPelaAPI";
      return of(retornoMock);
    }
    retornoMock.sucesso = false;
    retornoMock.usuario = usuario;
    return of(retornoMock);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  get obterUsuarioLogado(): Login {
    return localStorage.getItem('usuario')
      ? JSON.parse(atob(localStorage.getItem('usuario')))
      : null;
  }
  get obterIdUsuarioLogado(): string {
    return localStorage.getItem('usuario')
      ? (JSON.parse(atob(localStorage.getItem('usuario'))) as Login).id
      : null;
  }
  get obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token')))
      : null;
  }
  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}

