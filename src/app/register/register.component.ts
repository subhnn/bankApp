import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  accno="enter the account number"
  acno=""
  pswd=""
  uname=""


  registerForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
Register(){
  console.log(this.registerForm);

  if(this.registerForm.valid){
  var uname=this.registerForm.value.uname
  var acno=this.registerForm.value.acno
  var pswd=this.registerForm.value.pswd


  
// asynchronus


  this.ds.register(acno,pswd,uname)
  .subscribe((result:any)=>{

    if(result){
      alert("account registerd successfully")
      this.router.navigateByUrl('')
    }


  },
  (result)=>{
    alert(result.error.message)
  }

  )

  }
  else{
    alert("invalid form")
  }


}
}


