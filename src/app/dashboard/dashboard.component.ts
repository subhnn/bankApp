import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {




  acno=""
  pswd=""
  amount=""

  acno1=""
  pswd1=""
  amount1=""


  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

user=this.ds.currentName

  constructor(private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }


  Deposit(){
    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amount=this.depositForm.value.amount



    if(this.depositForm.valid){
      let result=this.ds.Deposit(acno,pswd,amount)

      if(result){
        alert(amount+"credited.current balance is:"+ result)
      }
      else{
        alert("invalid form")
      }

    }


    }

  withdraw(){
    var acno=this.acno1
    var pswd=this.pswd1
    var amount=this.amount1

    let result=this.ds.withdaw(acno,pswd,amount)

    if (result){
      alert(amount+"debited.current balance is:"+ result)
    }

  }

}
