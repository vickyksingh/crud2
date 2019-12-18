import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    url = 'https://crud-e3bb5.firebaseio.com/student.json'
    constructor ( private http : HttpClient) {
    }

    postData(data){
      return this.http.post(this.url, data) 
    }

    getData(){
        return this.http.get(this.url)
    }

    delData(id){
        return this.http.delete('https://crud-e3bb5.firebaseio.com/student/'+id+".json")
    }
}