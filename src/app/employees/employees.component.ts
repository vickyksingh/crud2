import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from './employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employeeForm: FormGroup;
  empUrl = "https://crud-e3bb5.firebaseio.com/";
  employees :Employee[]= []
  employee_id : string;
  button_enable : boolean = true;
  serchTerm: string;

  constructor(private formbuider: FormBuilder, private http: HttpClient) { }

  ngOnInit() {

    this.employeeForm = this.formbuider.group({
      fullname: [null, [Validators.required, Validators.minLength(6)]],
      email: [null, [Validators.required, Validators.email]],
      contact: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      salary: [null, [Validators.required, Validators.pattern('[1-9][0-9][0-9]')]]
    })

    this.getEmployees()
  }

  addInputValue() {
    //console.log(this.employeeForm.value)
    this.http.post(this.empUrl + "/employee.json", this.employeeForm.value).subscribe(
      (res) => {
        console.log(`record add ${res}`)
        this.getEmployees();
        this.resetForm()
      } 
    )
  }
   resetForm():void{
    this.employeeForm.reset()
    
  }

  deleteEntry(id){
    this.http.delete(this.empUrl+"/employee/"+id+".json").subscribe(
      (res) => {
        console.log('deleted')
      this.getEmployees()
    }
     
    )
  }

  editEntry(emp){
    this.button_enable = false
    this.employeeForm.patchValue(emp);
    this.employee_id = emp.id

  }
  updateEntry(){
    this.button_enable = true
    this.http.put(this.empUrl+'/employee/'+this.employee_id+".json", this.employeeForm.value).subscribe(
      res=>{
console.log('updated')
this.getEmployees()
      }
    )
  }

  getEmployees() {
    this.http.get(this.empUrl+'/employee.json').pipe(
      map(resdata=>{
        let newArray = [];
        for(let key in resdata){
          newArray.push({...resdata[key], id: key})
        }
        return newArray;
      })
    )
    
    .subscribe(
      (res) => {
        console.log(res)
        this.employees = res
      
      },
      (err)=>{
        //console.log('the error is ', err.error.error)
              console.log('the error is ', err.status)

      }
    )
  }

}
