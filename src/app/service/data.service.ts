import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentName:any
  currentuser:any

  users:any ={
    1000:{acno:1000,uname:"ajmal",password:"1001",balance:5000,transaction:[]},
    1001:{acno:1001,uname:"don",password:"1002",balance:5000,transaction:[]},
    1002:{acno:1002,uname:"vivek",password:"1003",balance:5000,transaction:[]}


  }

  constructor() {
   this.getDetails()
   }


saveDetails(){
if(this.users){
  localStorage.setItem("user",JSON.stringify(this.users))
}
if(this.currentName){
  localStorage.setItem("Uname",JSON.stringify(this.currentName))
}
if(this.currentuser){
  localStorage.setItem("Cuser",JSON.stringify(this.currentuser))
}

}
getDetails(){

if(localStorage.getItem("user")){
  this.users=JSON.parse(localStorage.getItem("user")||'')
}
if(localStorage.getItem("Uname")){
  this.currentName=JSON.parse(localStorage.getItem("Uname")||'')
}
if(localStorage.getItem("Cuser")){
  this.currentuser=JSON.parse(localStorage.getItem("Cuser")||'')
}
}


getTransaction(){

 return this.users[this.currentuser].transaction
}


  register(acno:any,password:any,uname:any){
    let db=this.users
    if(acno in db){
      return false
    }
    else{
      db[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      }
      // console.log(db);
      this. saveDetails()
      return true

    }
  }



login(acno:any,password:any){
  let database=this.users
  if(acno in database){
    if(password==database[acno]["password"]){
      this.currentuser=acno

      this.currentName=database[acno]["uname"]
     this. saveDetails()
      return true
    }

  else{
    alert("incorrect password")
    return false
  }
  }
else{
  alert("invalid account number")
  return false

}

}


Deposit(acno:any,password:any,amt:any){

var amount=parseInt(amt)
let db=this.users
if(acno in db){
  if(password==db[acno]["password"]){
    db[acno]["balance"]=db[acno]["balance"]+amount
    db[acno].transaction.push({
      type:"credit",
      amount:amount})
    this. saveDetails()
    return db[acno]["balance"]
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



withdaw(acno:any,password:any,amt:any){

var amount=parseInt(amt)
let db=this.users
if(acno in db){
  if(password==db[acno]["password"]){
    if(db[acno]["balance"]>amount){
      db[acno]["balance"]=db[acno]["balance"] -amount
      db[acno].transaction.push({
        type:"debit",amount:amount})

      this. saveDetails()
      return db[acno]["balance"]

    }
    else{
      alert("insufficient balance")
    }
  }
else{
  alert("incorrect password")
}
}
else{
  alert("account does not exist")
  return false
}

}
}
