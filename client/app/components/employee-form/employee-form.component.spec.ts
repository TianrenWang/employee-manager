import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeFormComponent } from './employee-form.component';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitting form should clear it', () => {
    component.employeeForm.setValue({
      employeeId: "1234",
      firstName: "Mocker",
      lastName: "Mocker",
      phoneNumber: "11111111",
      address: "Mocker Drive",
      title: "Mock Tester"
    });
    component.submitFormValue();
    expect(component.employeeForm.value).toEqual({
      employeeId: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      title: ""
    });
  });
});
