import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title:String="Login"
  user={email:'',password:''}
 
  usersigninForm: FormGroup=new FormGroup({
    email: new FormControl(this.user.email),
    password: new FormControl(this.user.password)
  });
  error_login:Boolean=false

  constructor(private formBuilder:FormBuilder, private _authService:AuthService
    ,private router:Router) { }

  ngOnInit(): void {
    this.usersigninForm = this.formBuilder.group({
      email: [this.user.email, [
        Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.([a-z]{3})+(\.([a-z]{2,}))?$')
      ]],
      password: [this.user.password, [
        Validators.required
      ]]
    });
  }

  loginUserData(){
    const formData = new FormData();
    formData.append('email',this.usersigninForm.get('email')!.value);
    formData.append('password',this.usersigninForm.get('password')!.value);
    this._authService.loginUser(formData)
    .subscribe((res)=>{
      console.log(res)
      var user=JSON.parse(JSON.stringify(res))
      if(user==null){
            this.error_login=true    
      }
      else{
        localStorage.setItem('token',user.token)   
        var token=JSON.parse(atob(user.token.split('.')[1]))
        console.log(token.subject.role)   
        this.router.navigate([''])
      }
      
    })
  }

}
