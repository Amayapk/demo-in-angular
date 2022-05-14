import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    aim="your perfect banking partner"
    accnum="Account Number Please"
    acno=""
    psw=""


    loginForm=this.fb.group({
      acno:["",[Validators.required,Validators.pattern('[0-9]*')]],
      psw:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
     
    })
  //database

  

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  acnoChange(event:any){
    this.acno=event.target.value
  }
  pswChange(event:any){
    this.psw=event.target.value
  }
  login(){
    var acno=this.loginForm.value.acno
    // console.log(this.acno)
    var psw=this.loginForm.value.psw
   if(this.loginForm.valid){
    const result=this.ds.login(acno,psw)
    if(result){
      alert("login successful")
      this.router.navigateByUrl("dashboard")
    }
   }
   else{
     alert("invalid form")
   }
    
    
  }
}

//   login(a:any,p:any){
//     console.log(a)
//     var acno=a.value
//     console.log(acno)
//     var psw=p.value
//     console.log(psw)
//     let database=this.database
//     if(acno in database){
//        if(psw==database[acno]["password"]){
//          alert('login successfull')
//        }
//        else{
            // alert("incorrect password")
//        }
        //  }  
//     else{
//       alert("account number does not exist")
//     }
//   }

