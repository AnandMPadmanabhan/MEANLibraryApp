import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendserviceService } from '../backendservice.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title:String="Sign Up"
  progress_color:string=""
  progress_width:number=0
  progress_text:string="TEst"
  user={_id:'',uname:'',email:'',phone:'',password:'',confirmpassword:''}

  userupdateForm: FormGroup=new FormGroup({
    uname: new FormControl(this.user.uname),
    email: new FormControl(this.user.email),
    phone: new FormControl(this.user.phone),
    password: new FormControl(this.user.password),
    confirmpassword: new FormControl(this.user.confirmpassword)
  });
  error_signup:Boolean=false
  
  constructor(private formBuilder:FormBuilder, private userService:BackendserviceService
    ,private router:Router ) {}

  ngOnInit(): void {
    this.userupdateForm = this.formBuilder.group({
      uname: [this.user.uname, [
        Validators.required
      ]],
      email: [this.user.email, [
        Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.([a-z]{3})+(\.([a-z]{2,}))?$')
      ]],
      phone: [this.user.phone, [
        Validators.required, Validators.pattern('([0-9]{3})+([-. ]?)+([0-9]{3})+([-. ]?)+([0-9]{4})$'),
        Validators.minLength(10),Validators.maxLength(12)
      ]],
      password: [this.user.password, [
        Validators.required, Validators.pattern('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$')
      ]],
      confirmpassword: [this.user.confirmpassword, [
        Validators.required
      ]]
    });
  }

  addUserData(){
    const formData = new FormData();
    formData.append('uname', this.userupdateForm.get('uname')!.value);
    formData.append('email',this.userupdateForm.get('email')!.value);
    formData.append('phone', this.userupdateForm.get('phone')!.value);
    formData.append('password', this.userupdateForm.get('password')!.value);
    this.userService.addUser(this.userupdateForm.value)
    .subscribe((res)=>{
      console.log(res)
      var user=JSON.parse(JSON.stringify(res))
      if(user.result){
        this.error_signup=true
      }
      else{
        this.router.navigate(['/login'])
      }
      
    })
  }

  onPasswordStrengthChanged(strength:any) {
    console.log('====================================');
    console.log('onPasswordStrengthChanged', strength);
    console.log('====================================');
  }


  
}
