import { state } from '@angular/animations';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/models/user.model';
import { AuthService } from '../component/login/auth.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverGuard implements Resolve<User> {

  constructor(private service: UserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {

    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return  of({
      id: null,
      nome: null,
      quantidade: null,
      start: null,
      end: null,
      categoria: null,
      status: null,
      date: null,
      horarioInicio: null,
      horarioFinal: null,
      local: null,
      inscritos: null,
      email: null,
      descricao:null,
    });
  }
}
