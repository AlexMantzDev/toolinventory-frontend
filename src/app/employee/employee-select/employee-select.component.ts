import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../models/Employee';
import { CommonModule } from '@angular/common';
import { ToolsService } from '../../tools/tools.service';

@Component({
  selector: 'app-employee-select',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-select.component.html',
  styleUrl: './employee-select.component.scss'
})
export class EmployeeSelectComponent implements OnInit {
  currentEmployee: Employee | null = null;
  employeeForm = new FormGroup({
    code: new FormControl('')
  })

  constructor(public employeeService: EmployeeService, private toolsService: ToolsService) {}

  ngOnInit(): void {
    this.employeeService.employee$.subscribe((employee) => {
      this.currentEmployee = employee
    })
  }

  onSubmit() {
    if(this.employeeForm.value.code == null) return
    this.employeeService.fetchEmployee(this.employeeForm.value.code)
    this.employeeForm.reset()
  }

}
