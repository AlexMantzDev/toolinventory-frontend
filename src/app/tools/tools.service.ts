import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tool } from '../models/Tool';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  toolsSubject = new BehaviorSubject<Tool[]>([])
  tools$: Observable<Tool[]> = this.toolsSubject.asObservable()

  constructor(private http: HttpClient) { }

  fetchToolsByEmployeeCode(code: string): void {
    this.http.get<{tools: Tool[]}>(`http://localhost:5000/api/v1/inventory/lookup/employees/${code}?method=codes`, {
      withCredentials: true
    }).subscribe({
      next: ({tools}) => {
        console.log(tools)
        this.toolsSubject.next(tools)
      },
      error: () => {
        console.log("error fetching tools")
      }
    })
  }

  fetchAllTools() {
    this.http.get<{tools: Tool[]}>(`http://localhost:5000/api/v1/tools/`, {
      withCredentials: true
    }).subscribe({
      next: ({tools}) => {
        this.toolsSubject.next(tools)
      },
      error: () => {
        console.log("error fetching tools")
      }
    })
  }

  checkoutTool(employeeCode: string, toolCode: string) {
    this.http.post(`http://localhost:5000/api/v1/inventory/checkout?method=codes`, {
      employeeCode,
      toolCode,
    }, {
      withCredentials: true
    }).subscribe({
      next: () => {
        this.fetchToolsByEmployeeCode(employeeCode)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
