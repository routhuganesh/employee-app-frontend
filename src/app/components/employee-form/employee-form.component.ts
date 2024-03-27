// Import necessary Angular core and form modules, router modules, and custom models and services.
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, Skill } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

// Component decorator with selector, template URL, and style URLs specified.
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employee!: Employee; // The employee object to be edited or viewed.
  employeeForm: FormGroup; // The FormGroup object for the employee form.
  isEdit = false; // Boolean flag to determine if the form is in edit mode.
  currentEmployeeId: number | null = null; // Stores the current employee's ID if in edit mode.
  
  // Constructor function with injected services and modules.
  constructor(
    private fb: FormBuilder, // FormBuilder service to create form control elements.
    private employeeService: EmployeeService, // Custom employee service for CRUD operations.
    private router: Router, // Router service for navigation.
    private route: ActivatedRoute // ActivatedRoute service to access route parameters.
  ) {
    // Initialize the employeeForm FormGroup with form controls and validators.
    this.employeeForm = this.fb.group({
      id: ['', [Validators.required,Validators.pattern('^[0-9]+$')]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required,Validators.pattern('^\\+?\\d{10,15}$')]],
      gender: ['Male', Validators.required],
      skills: this.fb.array([this.createSkill()]) // FormArray for dynamic skill entries.
    });
   }

  ngOnInit(): void {
    // On component initialization, check if there's an 'id' parameter in the route indicating edit mode.
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.currentEmployeeId = +id;
        this.employeeForm.get('id')?.disable(); // Disable ID field in edit mode.
        const employee = this.employeeService.getEmployeeById(this.currentEmployeeId);
        if (employee) {
          this.employeeForm.patchValue(employee); // Populate form if employee exists.
          this.setSkills(employee.skills); // Set skills form array.
        }
      } else {
        this.employeeForm.get('id')?.enable(); // Enable ID field for new entries.
      }
    });
  }

  // Creates a FormGroup for a skill with validators.
  createSkill(skill?: Skill): FormGroup {
    return this.fb.group({
      name: [skill?.name || '', Validators.required],
      experience: [skill?.experience || '', Validators.required]
    });
  }

  // Sets the skills FormArray with existing skill data.
  setSkills(skills: Skill[]): void {
    const skillFGs = skills.map(skill => this.createSkill(skill));
    const skillFormArray = this.fb.array(skillFGs);
    this.employeeForm.setControl('skills', skillFormArray);
  }

  // Returns the skills FormArray for dynamic skill entry manipulation.
  skills(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }

  // Adds a new skill FormGroup to the skills FormArray.
  addSkill(): void {
    this.skills().push(this.createSkill());
  }

  // Removes a skill FormGroup from the skills FormArray by index.
  deleteSkill(index: number): void {
    this.skills().removeAt(index);
  }

  // Handles form submission for creating or updating an employee.
  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.isEdit && this.currentEmployeeId !== null) {
        this.employeeService.updateEmployee(this.currentEmployeeId, this.employeeForm.value);
      } else {
        if(!this.employeeService.employeeExists(+this.employeeForm.value.id)) {
          this.employeeService.addEmployee(this.employeeForm.value);
        } else {
          alert('An employee with this ID already exists');
        }
      }
      this.router.navigate(['/employees']); // Navigate back to the employees list.
    }
  }

  // Utility function to get an employee by ID (seems unused and could be removed).
  getEmployeeById(id: number): Employee | undefined {
    return this.employeeService.getEmployees().find(x => x.id === id);
  }
}
