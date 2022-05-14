import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  acno=""
  psw=""
  amount=""

  acno1=""
  psw1=""
  amount1=""

  // deposit 
  depositForm=this.fb.group({
    acno:["",[Validators.required,Validators.pattern('[0-9]*')]],
    psw:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:["",[Validators.required,Validators.pattern('[0-9 ]*')]]
     
  })
// withdraw
  withdrawForm=this.fb.group({
    acno1:["",[Validators.required,Validators.pattern('[0-9]*')]],
    psw1:["",[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount1:["",[Validators.required,Validators.pattern('[0-9 ]*')]]
     
  })

  user:any
  loginDate:any
  
  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
    this.user=this.ds.currentUsername
    this.loginDate=new Date
   }

  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("please login..")
      this.router.navigateByUrl("")
    }
  }
  deposit(){
    var acno=this.depositForm.value.acno
    var psw=this.depositForm.value.psw
    var amount=this.depositForm.value.amount
    if(this.depositForm.valid){
      const result=this.ds.deposit(acno,psw,amount)
   if(result){
     alert(amount+"deposited successfully and new balance is: "+result)
   }
    }
// call deposit in dataservice
   else{
     alert("invalid form")
   }
  }
  withdraw(){
    var acno=this.withdrawForm.value.acno1
    var psw=this.withdrawForm.value.psw1
    var amount=this.withdrawForm.value.amount1
// call deposit in dataservice
if(this.withdrawForm.valid){
  const result=this.ds.withdraw(acno,psw,amount)
  if(result){
    alert(amount+"debited successfully and new balance is: "+result)
  }
}
else{
  alert("invalid form")
}
  }
// logout
logout(){
  localStorage.removeItem("currentUsername")
  localStorage.removeItem("currentAcno")
  this.router.navigateByUrl("")
}
}
