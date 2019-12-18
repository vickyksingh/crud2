import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from './student.service';
import { Student } from './student.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild('lognForm', null) frm: NgForm
  students: Student[] = []
  constructor(private studentservice: StudentService) { }

  ngOnInit() {
    this.fatchData()
  }

  onSubmit(frm: NgForm) {
    this.studentservice.addStudent(frm.value).subscribe(
      (res) => {
        this.fatchData()
        console.log('Added!')
        frm.reset()
        

      },
      (err) => {
        console.log(err);

      }
    )
  }
  ngAfterViewInit(){
    
  }

  editEntry(student){
    this.frm.reset({
     userId: '',
     username:'',
     password:''
    })
  }
  


  fatchData() {
    this.studentservice.getStudent().pipe(
      map(resdata => {
        let newArray = [];
        for (let key in resdata) {
          newArray.push({ ...resdata[key], id: key })
        }
        return newArray;
      })
    ).subscribe(
      (res) => {
        console.log(res)
        this.students = res;
        console.log(this.students)
      },
      (err) => {
        console.log(err);
      }
    )
  }
  deleteEntry(id:number){
    this.studentservice.deleteStudent(id).subscribe(
      (res)=>{
        this.fatchData()
        console.log('Deleted!') 
    },
    (err)=>{
      console.log(err.error.error)
    }
      
    )
  } 

}
