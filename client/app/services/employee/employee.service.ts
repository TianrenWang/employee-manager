import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'client/app/models/employee.model';
import { environment } from 'client/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]>{
    let url = environment.backendURL + "/api/employee";
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.success === true && response.employees){
          let employees: Employee[] = [];
          response.employees.forEach((employee: any) => {
            employees.push(this.getEmployeeWithoutMetaData(employee));
          });
          return employees;
        } else {
          if (response.message){
            console.error(response.message);
          }
          return [];
        }
      })
    );
  }

  createEmployee(employee: Employee): Observable<Employee | null>{
    let url = environment.backendURL + "/api/employee";
    return this.http.post<any>(url, employee).pipe(
      map(response => {
        if (response.success === true && response.employee){
          return this.getEmployeeWithoutMetaData(response.employee);
        } else {
          if (response.message){
            console.error(response.message);
          }
          return null;
        }
      })
    );
  }

  deleteEmployee(employeeId: string): Observable<boolean>{
    let url = environment.backendURL + "/api/employee";
    let params = new HttpParams().set(
      'employeeId',
      employeeId
    )
    let options = {
      params: params
    };
    return this.http.delete<any>(url, options).pipe(
      map(response => {
        if (response.success === true){
          return true;
        } else {
          if (response.message){
            console.error(response.message);
          }
          return false;
        }
      })
    );
  }

  editEmployee(employeeId: string, newEmployee: any): Observable<Employee | null>{
    let url = environment.backendURL + "/api/employee";
    let params = new HttpParams().set(
      'employeeId',
      employeeId
    )
    let options = {
      params: params
    };
    return this.http.patch<any>(url, newEmployee, options).pipe(
      map(response => {
        if (response.success === true && response.employee){
          return this.getEmployeeWithoutMetaData(response.employee);
        } else {
          if (response.message){
            console.error(response.message);
          }
          return null;
        }
      })
    );
  }

  // Remove all unnecessary properties from http response employee object
  getEmployeeWithoutMetaData(employeeObject: any): Employee {
    let employee: Employee = {
      firstName: employeeObject.firstName,
      lastName: employeeObject.lastName,
      employeeId: employeeObject.employeeId,
      phoneNumber: employeeObject.phoneNumber,
      address: employeeObject.address,
      title: employeeObject.title
    };
    return employee;
  }
}
