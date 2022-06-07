import { state } from '@angular/animations';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../component/login/auth.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private userService: UserService, private router: Router, private authService: AuthService){}
  canActivate(){
    if (this.authService.logado) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }



  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  //   if(!this.authService.isAuthenticated()){
  //     if(state.url != '/login') {
  //      this.router.navigate(['/login']);
  //     }
  //     return false;
  //   }else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

}
