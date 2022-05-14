import { TmplAstContent } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUsername:any
  currentAcno:any

  database:any={
    1000:{acno:1000,uname:"Amaya",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,uname:"Anu",password:1001,balance:6000,transaction:[]},
    1002:{acno:1002,uname:"Ammu",password:1002,balance:7000,transaction:[]}
  }

  constructor() { 
    this.getDetails()

  }

  // save data in local storage
  saveDetails(){
    localStorage.setItem("database",JSON.stringify(this.database))
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))

    }
    if(this.currentUsername){
      localStorage.setItem("currentUsername",JSON.stringify(this.currentUsername))
      
    }
  }
  // get data from loaclstorage

  getDetails(){
    if(localStorage.getItem("database")){
      this.database=JSON.parse(localStorage.getItem("database")||'')
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||'')
    }
    if(localStorage.getItem("currentUsername")){
      this.currentUsername=JSON.parse(localStorage.getItem("currentUsername")||'')
    }
  }


  register(acno:any,password:any,uname:any){
   let database=this.database
   if(acno in database){
     return false
   }
   else{
     database[acno]={
       acno,
       uname,
       password,
       balance:0,
       transaction:[]
     }
     this.saveDetails()
     console.log(database)
     return true
   }
    
  }


login(acno:any,psw:any){
  let database=this.database
  if(acno in database){
     if(psw==database[acno]["password"]){
       this.currentUsername=database[acno]["uname"]
       this.currentAcno=acno
       this.saveDetails()
       return true
     }
     else{
        alert("incorrect password")
        return false
      }
    }
    else{
        alert("account number does not exist")
        return false
      }
}
deposit(acno:any,psw:any,amt:any){
  var amount=parseInt(amt)
  let database=this.database

if(acno in database){
  if(psw==database[acno]["password"]){
    database[acno]['balance']+=amount
    database[acno]["transaction"].push({
      type:'CREDIT',
      amount:amount
    })
    console.log(database)
    this.saveDetails()
    return database[acno]['balance']

  } 
  else{
    alert("incorrect password")
    return false
  }  
  }
else{
  alert("account does not exist")     
  return false
}
}

withdraw(acno:any,psw:any,amt:any){
  var amount=parseInt(amt)
  let database=this.database

if(acno in database){
  if(psw==database[acno]["password"]){
    if(database[acno]["balance"]>amount){
    database[acno]['balance']-=amount
    database[acno]["transaction"].push({
      type:'DEBIT',
      amount:amount
    })
    this.saveDetails()
    console.log(database)
    return database[acno]['balance']
    }
    else{
      alert("insufficient balance")
      return false
    }

  } 
  else{
    alert("incorrect password")
    return false
  }  
  }
else{
  alert("account does not exist")
  return false
}
}

getTransaction(acno:any){
 return this.database[acno]["transaction"]
 

}

}

