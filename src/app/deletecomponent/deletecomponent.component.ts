import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-deletecomponent',
  templateUrl: './deletecomponent.component.html',
  styleUrls: ['./deletecomponent.component.css']
})
export class DeletecomponentComponent implements OnInit {
@Input() item:string|undefined
@Output() onDelete=new EventEmitter()
@Output() onCancel=new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  deleteFromChild(){
    this.onDelete.emit(this.item)
  }

  cancelFromchild(){
    this.onCancel.emit()
  }
}
