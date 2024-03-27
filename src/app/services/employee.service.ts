import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = []; 
  constructor()
  {
    this.seedEmployees();
  }
  seedEmployees(): void {
    // Seed initial data
    const initialEmployees: Employee[] = [
      {
        id: 1,
        name: 'John',
        email: 'john@gmail.com',
        contactNumber: '896547854',
        gender: 'Male',
        skills: [
          { name: 'HTML', experience: 4 }
        ]
      },
      {
        id: 2,
        name: 'Mary',
        email: 'mary@gmail.com',
        contactNumber: '896547854',
        gender: 'Female',
        skills: [
          { name: 'HTML', experience: 4 },
          { name: 'CSS', experience: 4 },
          { name: 'Management', experience: 4 }
        ]
      },
      {
        id: 3,
        name: 'Victor',
        email: 'victor@gmail.com',
        contactNumber: '996547854',
        gender: 'Male',
        skills: [
          { name: 'HTML', experience: 4 }
        ]
      },
      {
        id: 4,
        name: 'Mickey',
        email: 'mickey@gmail.com',
        contactNumber: '786547854',
        gender: 'Male',
        skills: [
          { name: 'HTML', experience: 4 }
        ]
      },
      {
        id: 5,
        name: 'Minie',
        email: 'minie@gmail.com',
        contactNumber: '789547854',
        gender: 'Female',
        skills: [
          { name: 'HTML', experience: 4 }
        ]
      },
    ];
    
    // Assign to the employees property
    this.employees = initialEmployees;
  }

  getEmployees(): Employee[] {
    return this.employees;
  }
  employeeExists(id: number): boolean {
    return this.employees.some(e => e.id === id);
  }

  getEmployeeById(id: number): Employee | undefined {
        console.log('Looking for employee with ID:', id);
        console.log('Current employees list:', this.employees);
        const employee = this.employees.find(e => e.id == id);
        if (!employee) {
          console.error('No employee found!');
        }
        return employee;
      }

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  updateEmployee(id: number, updatedEmployee: Employee): void {
    const index = this.employees.findIndex(e => e.id == id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(e => e.id !== id);
  }
}
