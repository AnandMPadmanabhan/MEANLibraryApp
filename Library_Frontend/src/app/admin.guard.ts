import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _authService:AuthService, private _router:Router){}
  canActivate():boolean{
    var token:any=localStorage.getItem('token')
    console.log(token)   
    if(token!=null){
      var token_obj=JSON.parse(atob(token.split('.')[1]))
      var user_type=token_obj.subject.role
      return user_type=='admin'
    }
    else{
      this._router.navigate([''])
      return false
    }  


  }
  
}
