import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class StudentService {

    studUrl = 'https://crud-e3bb5.firebaseio.com/'
    constructor(private http : HttpClient){}

    ngOnInit(){}

    addStudent(data):Observable<Student>{
        return this.http.post<Student>(this.studUrl+"/student.json", data)
    }
    getStudent():Observable<Student>{
        return this.http.get<Student>(this.studUrl+"/student.json")
    }
    deleteStudent(id):Observable<Student>{
        return this.http.delete<any>(this.studUrl+"/student/"+id+'.json')
    }
}