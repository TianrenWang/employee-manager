import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from 'client/app/services/employee/employee.service';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  editing: boolean;
  filtered: boolean;

  @Input() employee!: Employee;
  @Input() filterCondition!: Employee;
  @Output() deletedEmployee = new EventEmitter();

  constructor(private employeeService: EmployeeService) {
    this.editing = false;
    this.filtered = false;
  }

  ngOnInit(): void {

  }

  deleteEmployee(): void {
    this.deletedEmployee.emit(this.employee.employeeId);
  }

  editEmployee(): void {
    this.editing = true;
  }

  cancelEdit(): void {
    this.editing = false;
  }

  submitModifiedEmployee(employee: Employee): void {
    this.editing = false;
    this.employeeService.editEmployee(this.employee.employeeId, employee).subscribe(
      (newEmployee: Employee | null) => {
        if (newEmployee){
          Object.assign(this.employee, newEmployee);
        }
      });
  }

  isFiltered(): boolean {
    if (this.employee.employeeId.indexOf(this.filterCondition.employeeId) < 0){
      return true;
    }
    if (this.employee.firstName.indexOf(this.filterCondition.firstName) < 0){
      return true;
    }
    if (this.employee.lastName.indexOf(this.filterCondition.lastName) < 0){
      return true;
    }
    if (this.employee.phoneNumber.indexOf(this.filterCondition.phoneNumber) < 0){
      return true;
    }
    if (this.employee.address.indexOf(this.filterCondition.address) < 0){
      return true;
    }
    if (this.employee.title.indexOf(this.filterCondition.title) < 0){
      return true;
    }
    return false;
  }

}
