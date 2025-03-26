import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Employee } from '../models/Employee';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from '../tools/tools.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeSubject = new BehaviorSubject<Employee | null>(null)
  employee$ = this.employeeSubject.asObservable()
  

  constructor(private http: HttpClient, private toolsService: ToolsService) { }

  fetchEmployee(code: string) {
    this.http.get<{employee: Employee}>(`http://localhost:5000/api/v1/employees/${code}?method=codes`, {withCredentials: true})
    .subscribe(({employee}) => {
      if(employee !== null) {
        this.employeeSubject.next(employee)
        this.toolsService.fetchToolsByEmployeeCode(employee.code)
      }
    })
  }
}
