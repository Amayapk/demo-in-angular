import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService} from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  uname=""
  acno=""
  psw=""

  // registerform
  registerForm=this.fb.group({
    uname:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    acno:["",[Validators.required,Validators.pattern('[0-9]*')]],
    psw:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
   
  })
 

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  register(){

   if(this.registerForm.get('uname')?.errors){
     alert("incorrect user name")
   }
  
   var acno=this.registerForm.value.acno
   var psw=this.registerForm.value.psw
   var uname=this.registerForm.value.uname

   if(this.registerForm.valid){

   
    const result=this.ds.register(acno,psw,uname)
    if(result){
      alert("registration successfully")
      this.router.navigateByUrl("")
    }
    else{
      alert("account already exist..please login")
    }
  }
  else{
    alert("Invalid form")
  }
}
}
