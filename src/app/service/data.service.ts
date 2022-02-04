import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ɵresetJitOptions } from '@angular/core';
// import { debounceTime } from 'rxjs';



const options={
  headers:new HttpHeaders(),
};

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

  constructor(private http:HttpClient) {
  //  this.getDetails()
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


getTransaction(acno:any){
  const data ={
    acno
  }

 return  this.http.post('http://localhost:3000/getTransaction',data,this.getOptions())
}


  register(acno:any,password:any,uname:any){

const data ={
  acno,
  password,
  uname
}
return this.http.post('http://localhost:3000/register',data)


  }


login(acno:any,password:any){

const data={
  acno,
  password
}

return this.http.post('http://localhost:3000/login',data)

}


Deposit(acno:any,password:any,amt:any){

const data={
  acno,
  password,
  amt
}

return this.http.post('http://localhost:3000/Deposit',data,this.getOptions())
}

// to add token into the request header

getOptions(){

  const token= JSON.parse(localStorage.getItem("token")||'')
  console.log(token);
  let headers=new HttpHeaders()
  if(token){
    headers=headers.append('x-access-token',token)
    options.headers=headers

  }
return options

}

withdraw(acno:any,password:any,amt:any){

  const data={
    acno,
    password,
    amt
  }

  return this.http .post('http://localhost:3000/withdraw',data,this.getOptions())
}



delete(acno:any){


  return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())

}
}
