import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  private employees: any[] = []
  @ViewChild('f', null) frm: NgForm;
  constructor(private http: HttpClient) { }
private loading = false
  ngOnInit() {
    this.getRecord()
  }

  deleteRecord(id){
    this.http.delete('https://crud-e3bb5.firebaseio.com/employee/'+id+".json").subscribe(
      res=>{
        this.getRecord()
        console.log('Deleted')
      }
    )
  }
  saveRecord(frm) {
    this.http.post('https://crud-e3bb5.firebaseio.com/employee.json', frm.value)

      .subscribe(
        (sentData) => {
          console.log(sentData)
          this.setformValue()
          this.getRecord()
        }
      )
  }

  setformValue() {
    this.frm.reset()

  }

  getRecord() {
    this.loading = true
    this.http.get('https://crud-e3bb5.firebaseio.com/employee.json').

      pipe(
        map(responsedata => {
          const respArray = []
          for (let key in responsedata) {
            respArray.push({ ...responsedata[key], id: key })
          }
          return respArray
        })
      )
      .subscribe(
        (res) => {
          this.loading = false
          console.log(res)
          this.employees = res
        }

      )

      
  }

}
