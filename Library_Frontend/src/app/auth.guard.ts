import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService:AuthService, private _router:Router){}
  canActivate():boolean{
    var token=localStorage.getItem('token')
    const parseJwt = (token:any) => {
      try {
        console.log(JSON.parse(atob(token.split('.')[1])))   
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    };
    parseJwt(token)
  if(this._authService.loggedIn()){
          return true
  }
  else{
      this._router.navigate([''])
      return false
  }

  }
  
}
