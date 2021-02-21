import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'client/app/models/employee.model';
import { AuthService } from 'client/app/services/auth/auth.service';
import { EmployeeService } from 'client/app/services/employee/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  employees: Employee[];
  employeeFilter: Employee;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private employeeService: EmployeeService) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    this.employees = [];
    this.employeeFilter = {
      firstName: "",
      lastName: "",
      employeeId: "",
      phoneNumber: "",
      address: "",
      title: ""
    }
  }

  ngOnInit(): void {
    if (this.isLoggedIn()){
      this.employeeService.getAllEmployees().subscribe((employees: Employee[]) => {
        this.employees = employees;
      })
    }
  }

  login(): void {
    let username: string = this.loginForm.value.username;
    let password: string = this.loginForm.value.password;
    this.authService.authorize(username, password).subscribe((auth_token: string | null) => {
      if (auth_token){
        this.employeeService.getAllEmployees().subscribe((employees: Employee[]) => {
          this.employees = employees;
        })
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.employees = [];
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  setFilter(filter: Employee): void {
    this.employeeFilter = filter;
  }

  addEmployee(employee: Employee): void {
    this.employeeService.createEmployee(employee).subscribe((resEmployee: Employee | null) => {
      if (resEmployee){
        this.employees.push(resEmployee);
      }
    })
  }

  deleteEmployee(employeeId: string): void {
    this.employeeService.deleteEmployee(employeeId).subscribe((success: boolean) => {
      if (success === true){
        let index = this.employees.findIndex(employee => employee.employeeId === employeeId);
        this.employees.splice(index, 1);
      }
    })
  }
}
