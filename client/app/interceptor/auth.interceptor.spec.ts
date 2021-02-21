import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'client/environments/environment';
import { EmployeeService } from '../services/employee/employee.service';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmployeeService,
        AuthInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ]
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('an arbitrary http request should contain an Authorization header', () => {
    let employeeId: string = "1234567";
    let token: string = "JWT secret_token";
    localStorage.setItem("auth_token", token);

    // trigger the http request
    service.deleteEmployee(employeeId).subscribe(success => {
      expect(success).toBeTruthy();
    })

    // mock the http call made in the method
    const req = httpMock.expectOne(`${environment.backendURL}/api/employee?employeeId=${employeeId}`);
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(token);
  })
});
