import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from 'client/app/models/employee.model';
import { AuthService } from 'client/app/services/auth/auth.service';
import { EmployeeService } from 'client/app/services/employee/employee.service';
import { of } from 'rxjs';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  let employeeService: EmployeeService;
  let homeElement: HTMLElement;
  const employee: Employee = {
    employeeId: "1234",
    firstName: "Mock1",
    lastName: "Mocker",
    phoneNumber: "11111111",
    address: "Mocker Drive",
    title: "Mock Tester"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, EmployeeFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService }
      ]
    }).compileComponents();
    authService = TestBed.inject(AuthService);
    employeeService = TestBed.inject(EmployeeService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    homeElement = fixture.nativeElement;
  });

  afterEach(() => {
    localStorage.clear();
    component.employees = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isLoggedIn returns false without auth_token in localstorage', () => {
    localStorage.clear();
    expect(component.isLoggedIn()).toBeFalse();
  });

  it('isLoggedIn returns true with auth_token in localstorage', () => {
    localStorage.setItem('auth_token', "test token");
    expect(component).toBeTruthy();
    localStorage.clear();
  });

  it('creating a new employee adds to the employees list', () => {
    let spy: any;
    spy = spyOn(employeeService, 'createEmployee').and.returnValue(of(employee));
    expect(component.employees).toEqual([]);
    component.addEmployee(employee);
    expect(component.employees).toEqual([employee]);
  });

  it('deleting an employee removes it from the employees list', () => {
    let spy: any;
    component.employees = [employee];
    spy = spyOn(employeeService, 'deleteEmployee').and.returnValue(of(true));
    component.deleteEmployee(employee.employeeId);
    expect(component.employees).toEqual([]);
  });

  it('component should only display login form when not logged in', () => {
    expect(homeElement.querySelector('button')?.textContent?.trim()).toEqual('Login');
  });

  it('component should only display employee manager when logged in', () => {
    localStorage.setItem('auth_token', "secret token");
    fixture.detectChanges();
    expect(homeElement.querySelector('button')?.textContent?.trim()).toEqual('Logout');
  });

  it('after clicking on logout button, isLoggedIn returns false', () => {
    localStorage.setItem('auth_token', "secret token");
    fixture.detectChanges();
    let button: HTMLButtonElement | null = homeElement.querySelector('button');
    button?.addEventListener('click', ()=>{});
    button?.click();
    expect(component.isLoggedIn()).toBeFalse();
  });
});
