// Import Angular core components, Material Dialog component, router, and custom models and services.
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

// Component decorator with selector, template URL, and style URLs.
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees!: Employee[]; // Array to hold the list of employees.

  // Constructor with injected services: EmployeeService for CRUD operations, Router for navigation, and MatDialog for dialog management.
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // On component initialization, fetch the list of employees from the EmployeeService.
    this.employees = this.employeeService.getEmployees();
  }

  /**
   * Opens a confirmation dialog for deleting an employee.
   * @param employee - The employee to be deleted.
   */
  deleteEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px', // Dialog width.
      height: 'auto', // Dialog height automatically adjusts to content.
      data: { name: employee.name }, // Passes the name of the employee to the dialog for display.
    });

    // Subscribes to the dialog close event to receive the result (true if confirmed).
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If deletion is confirmed, delete the employee and refresh the list.
        this.employeeService.deleteEmployee(employee.id);
        this.employees = this.employeeService.getEmployees(); // Refresh the list after deletion.
        const message = `${employee.name} is deleted successfully.`;
        setTimeout(() => console.log(''), 2000); // Placeholder for hiding the message, suggesting replacement with actual logic.
      }
    });
  }

  /**
   * Navigates to the add employee form.
   */
  addEmployee(): void {
    this.router.navigate(['/add']);
  }

  /**
   * Navigates to the edit form for the selected employee.
   * @param employee employee to edit.
   */
  editEmployee(employee: Employee): void {
    this.router.navigate(['/edit', employee.id]);
  }
}
