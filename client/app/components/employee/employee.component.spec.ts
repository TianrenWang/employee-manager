import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from 'client/app/services/employee/employee.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

import { EmployeeComponent } from './employee.component';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let service: EmployeeService;
  let employeeElement: HTMLElement;
  const firstName: string = "mocker";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeComponent, EmployeeFormComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: EmployeeService }
      ]
    })
    .compileComponents();
    service = TestBed.inject(EmployeeService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    component.employee = {
      employeeId: "1234",
      firstName: firstName,
      lastName: "Mocker",
      phoneNumber: "11111111",
      address: "Mocker Drive",
      title: "Mock Tester"
    };
    component.filterCondition = {
      employeeId: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      title: ""
    };
    fixture.detectChanges();
    employeeElement = fixture.nativeElement;
  });

  afterEach(() => {
    component.editing = false;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('editEmployee should make editing true', () => {
    component.editEmployee();
    expect(component.editing).toBeTrue();
  });

  it('cancelEdit should make editing false', () => {
    component.editEmployee();
    expect(component.editing).toBeTrue();
    component.cancelEdit();
    expect(component.editing).toBeFalse();
  });

  it('an empty filter condition should not filter the employee', () => {
    expect(component.isFiltered()).toBeFalse();
  });

  it('a filter condition that match employee should not filter the employee', () => {
    component.filterCondition = {
      employeeId: "",
      firstName: firstName,
      lastName: "",
      phoneNumber: "",
      address: "",
      title: ""
    };
    expect(component.isFiltered()).toBeFalse();
  });

  it('a filter condition that does not match employee should return true', () => {
    component.filterCondition = {
      employeeId: "",
      firstName: "does not match",
      lastName: "",
      phoneNumber: "",
      address: "",
      title: ""
    };
    expect(component.isFiltered()).toBeTrue();
  });

  it('should display employee if filter condition not met', () => {
    let paragraph: HTMLParagraphElement | null = employeeElement.querySelector('p');
    expect(paragraph?.textContent?.indexOf("First Name: " + firstName)).toBeGreaterThanOrEqual(0);
  });

  it('should not display employee if filter condition met', () => {
    component.filterCondition = {
      employeeId: "",
      firstName: "does not match",
      lastName: "",
      phoneNumber: "",
      address: "",
      title: ""
    };
    fixture.detectChanges();
    let paragraph: HTMLParagraphElement | null = employeeElement.querySelector('p');
    expect(paragraph).toBeNull();
  });

  it('while editing should only display submit and cancel edit buttons', () => {
    component.editEmployee();
    fixture.detectChanges();
    let buttonTexts: string[] = [];
    employeeElement.querySelectorAll('button').forEach((button: HTMLButtonElement | null) => {
      let buttonText: string | null | undefined = button?.textContent;
      if (buttonText){
        buttonTexts.push(buttonText.trim());
      }
    });
    expect(buttonTexts.includes('Submit Edit')).toBeTrue();
    expect(buttonTexts.includes('Cancel Edit')).toBeTrue();
  });

  it('while not editing should display only edit and delete buttons', () => {
    let buttonTexts: string[] = [];
    employeeElement.querySelectorAll('button').forEach((button: HTMLButtonElement | null) => {
      let buttonText: string | null | undefined = button?.textContent;
      if (buttonText){
        buttonTexts.push(buttonText.trim());
      }
    });
    expect(buttonTexts.includes('Edit')).toBeTrue();
    expect(buttonTexts.includes('Delete')).toBeTrue();
  });
});
