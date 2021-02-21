// This component displays and allows user to interact with an input form
// to fill out employee information. This is used for creating new employees,
// modifying existing employees, and also filtering employees by their properties.

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'client/app/models/employee.model';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  // A concise description of what this form is used for
  @Input() action!: string;

  // The pre-populated value, used only for editing
  @Input() initialValue!: Employee;
  @Output() employeeFormComplete = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      address: [''],
      employeeId: [''],
      title: ['']
    });
  }

  ngOnInit(): void {
    if (this.initialValue){
      this.employeeForm.setValue(this.initialValue);
    }
  }

  submitFormValue(): void {
    this.employeeFormComplete.emit(this.employeeForm.value);
    if (this.initialValue){
      this.employeeForm.setValue(this.initialValue);
    } else {
      this.employeeForm.reset({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        employeeId: '',
        title: ''
      });
    }
  }

}
