
import { PipeTransform, Pipe } from '@angular/core';
import { Employee } from './employee';


@Pipe({
    name: 'filterPipe'
})

export class EmployeePipe implements PipeTransform{
    
    transform(employees, serchTerm:string){
        console.log(serchTerm)
        if(!employees || !serchTerm){
            return employees
        }
            return employees.filter((employee)=>{
                employee.fullname.toLowerCase().indexOf(serchTerm.toLowerCase()) !== -1 })
        
    }
}