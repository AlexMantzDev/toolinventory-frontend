import { Component } from '@angular/core';
import { ToolsComponent } from "../tools/tools.component";
import { EmployeeSelectComponent } from "../employee/employee-select/employee-select.component";

@Component({
  selector: 'app-dashboard',
  imports: [ToolsComponent, EmployeeSelectComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
