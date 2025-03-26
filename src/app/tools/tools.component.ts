import { Component, OnInit } from '@angular/core';
import { ToolsService } from './tools.service';
import { Tool } from '../models/Tool';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/User';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../employee/employee.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tools',
  imports: [CommonModule],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent implements OnInit {
  currentEmployee: Employee | null = null
  tools$!: Observable<Tool[]>
  
  constructor(private toolService: ToolsService, private employeeService: EmployeeService) {
    
  }
  
  ngOnInit(): void {
    this.tools$ = this.toolService.tools$;
  }
}
