import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';
import { Employee } from 'client/app/models/employee.model';
import { environment } from 'client/environments/environment';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  let spy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllEmployees should return observable containing employees', () => {
    let employee1: Employee = {
      employeeId: "1234",
      firstName: "Mock1",
      lastName: "Mocker",
      phoneNumber: "11111111",
      address: "Mocker Drive",
      title: "Mock Tester"
    }
    let employee2: Employee = {
      employeeId: "12345",
      firstName: "Mock2",
      lastName: "Mocker",
      phoneNumber: "11111111",
      address: "Mocker Drive",
      title: "Mock Tester"
    }
    let mockEmployees: Employee[] = [employee1, employee2];
    let httpResponse: any = {
      success: true,
      employees: mockEmployees
    };

    // call the tested method
    service.getAllEmployees().subscribe(employees => {
      expect(employees).toEqual(mockEmployees);
    })

    // mock the http call made in the method
    const req = httpMock.expectOne(`${environment.backendURL}/api/employee`);
    expect(req.request.method).toBe("GET");
    req.flush(httpResponse);
  })

  it('createEmployee should return observable containing the new employee', () => {
    let employee: Employee = {
      employeeId: "1234",
      firstName: "Mock1",
      lastName: "Mocker",
      phoneNumber: "11111111",
      address: "Mocker Drive",
      title: "Mock Tester"
    }
    let mockEmployee: Employee = {...employee };
    let httpResponse: any = {
      success: true,
      employee: mockEmployee
    };

    // call the tested method
    service.createEmployee(employee).subscribe(employee => {
      expect(employee).toEqual(mockEmployee);
    })

    // mock the http call made in the method
    const req = httpMock.expectOne(`${environment.backendURL}/api/employee`);
    expect(req.request.method).toBe("POST");
    req.flush(httpResponse);
  })

  it('deleteEmployee should return observable containing deletion success', () => {
    let employeeId: string = "1234567";
    let httpResponse: any = {
      success: true
    };

    // call the tested method
    service.deleteEmployee(employeeId).subscribe(success => {
      expect(success).toBe(true);
    })

    // mock the http call made in the method
    const req = httpMock.expectOne(`${environment.backendURL}/api/employee?employeeId=${employeeId}`);
    expect(req.request.method).toBe("DELETE");
    req.flush(httpResponse);
  })

  it('patchEmployee should return observable containing modified employee', () => {
    let employeeId: string = "1234567";
    let modifiedTitle: string = "Mock Tester";
    let mockEmployee: Employee = {
      employeeId: employeeId,
      firstName: "Mock1",
      lastName: "Mocker",
      phoneNumber: "11111111",
      address: "Mocker Drive",
      title: modifiedTitle
    };
    let employeeModification: any = {
      title: modifiedTitle
    };
    let httpResponse: any = {
      success: true,
      employee: mockEmployee
    };

    // call the tested method
    service.editEmployee(employeeId, employeeModification).subscribe(employee => {
      expect(employee).toEqual(mockEmployee);
    })

    // mock the http call made in the method
    const req = httpMock.expectOne(`${environment.backendURL}/api/employee?employeeId=${employeeId}`);
    expect(req.request.method).toBe("PATCH");
    req.flush(httpResponse);
  })
});
