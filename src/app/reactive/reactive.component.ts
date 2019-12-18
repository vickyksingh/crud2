import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { EmployeeService } from '../employee.service';

import { map } from 'rxjs/operators'

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  formName: FormGroup;
  students: any[] = [];
  private update_id : string
  constructor(private fb: FormBuilder, private httpservice: EmployeeService) { };

  ngOnInit() {
    this.formName = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      address: this.fb.array([this.createDynamicField()])
    })

    this.displayData()
  }

  createDynamicField() {
    return this.fb.group({
      city: [null, [Validators.required]],
      state: [null, [Validators.required]]
    })
  }

  

  deleteData(id){
    this.httpservice.delData(id).subscribe(
      res=>{
        console.log('Deleted!')
        this.displayData()
      }
    )
  }

  saveRecord() {
    this.httpservice.postData(this.formName.value).subscribe(
      resdata => {
        console.log(resdata)
        this.displayData()
      }
    )
  }

  displayData() {
    this.httpservice.getData().
      pipe(
        map(responsedata => {
          let myArray = []
          for (let x in responsedata) {
            myArray.push({ ...responsedata[x], id: x })
          }
          return myArray;
        }
        )
      )
      .subscribe(
        resdata=>{
          console.log(resdata)
          
          this.students = resdata;
        },
        (err)=>{
          console.log(err)
        }
      )


  }




  addForm() {
    var control = this.formName.get('address') as FormArray;
    control.push(this.createDynamicField())
  }
  deleteForm(i) {
    var control = this.formName.get('address') as FormArray;
    control.removeAt(i)

  }
}
