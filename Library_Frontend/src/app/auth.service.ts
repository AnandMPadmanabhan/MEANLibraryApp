import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  isAdmin(){
    var token:any=localStorage.getItem('token')  
    if(token!=null){
      var token_obj=JSON.parse(atob(token.split('.')[1]))
      var user_type=token_obj.subject.role
      return user_type=='admin'
    }
    else{
      return false
    }  
  }

  loginUser(user:any){
    let user_data = new HttpParams();
    user_data = user_data.append('email', user.get('email'));
    user_data = user_data.append('password', user.get('password'));
    return this.http.get('http://localhost:2000/login',{params:user_data})
  }

  getToken(){
    return localStorage.getItem('token')
  }

}
