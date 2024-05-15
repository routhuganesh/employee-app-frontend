import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Employee[] = [];
  constructor() {
    this.seedEmployees();
  }
  seedEmployees(): void {
    // Seed initial data
    const initialEmployees: Employee[] = [
      {
        id: 1,
        name: 'John',
        email: 'john@gmail.com',
        contactNumber: '9876543210',
        gender: 'Male',
        skills: [{ name: 'HTML', experience: 4 }],
      },
      {
        id: 2,
        name: 'Mary',
        email: 'mary@gmail.com',
        contactNumber: '9876543210',
        gender: 'Female',
        skills: [
          { name: 'HTML', experience: 4 },
          { name: 'CSS', experience: 4 },
          { name: 'Management', experience: 4 },
        ],
      },
      {
        id: 3,
        name: 'Victor',
        email: 'victor@gmail.com',
        contactNumber: '9876543210',
        gender: 'Male',
        skills: [{ name: 'HTML', experience: 4 }],
      },
      {
        id: 4,
        name: 'Mickey',
        email: 'mickey@gmail.com',
        contactNumber: '9876543210',
        gender: 'Male',
        skills: [{ name: 'HTML', experience: 4 }],
      },
      {
        id: 5,
        name: 'Minie',
        email: 'minie@gmail.com',
        contactNumber: '9876543210',
        gender: 'Female',
        skills: [{ name: 'HTML', experience: 4 }],
      },
    ];

    // Assign to the employees property
    this.employees = initialEmployees;
  }

  /**
   * Retrieves all employees.
   * @returns An array of Employee objects representing all employees.
   */
  getEmployees(): Employee[] {
    return this.employees;
  }

  /**
   * Checks if an employee with the given ID exists in the list of employees.
   * @param id - The ID of the employee to check.
   * @returns A boolean indicating whether an employee with the given ID exists.
   */
  employeeExists(id: number): boolean {
    return this.employees.some((e) => e.id === id);
  }

  /**
   * Retrieves an employee by their ID.
   * @param id - The ID of the employee to retrieve.
   * @returns The Employee object corresponding to the given ID, or undefined if no employee is found.
   */
  getEmployeeById(id: number): Employee | undefined {
    const employee = this.employees.find((e) => e.id == id);
    if (!employee) {
      console.error('No employee found!');
    }
    return employee;
  }

  /**
   * Adds a new employee to the list of employees.
   * @param employee - The Employee object to add.
   */
  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  /**
   * Updates the details of an existing employee.
   * @param id - The ID of the employee to update.
   * @param updatedEmployee - The updated Employee object.
   */
  updateEmployee(id: number, updatedEmployee: Employee): void {
    const index = this.employees.findIndex((e) => e.id == id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      updatedEmployee.id = id;
    }
  }

  /**
   * Deletes an employee from the list of employees.
   * @param id - The ID of the employee to delete.
   */
  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((e) => e.id !== id);
  }
}
