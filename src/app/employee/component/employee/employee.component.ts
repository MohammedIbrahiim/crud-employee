import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../interface/employee';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  displayedColumns: string[] = [
    'name',
    'position',
    'department',
    'salary',
    'action',
  ];

  employee: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>();

  constructor(
    private _employeeService: EmployeeService,
    private dialog: MatDialog,
    private _router: Router
  ) {
    this.getEmployee();
  }
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getEmployee() {
    this._employeeService.getEmployee().subscribe((res) => {
      this.dataSource = new MatTableDataSource<Employee>(res);
      this.dataSource!.paginator = this.paginator;
    });
  }

  deleteEmployee(id: string) {
    this._employeeService.deleteEmployeeById(id).subscribe(
      (res) => {
        this.getEmployee();
      },
      (err) => {
        this.getEmployee();
      }
    );
  }

  getEmployeeById(id: string) {
    this._router.navigate([`/details/${id}`]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createEmployeeNavigate() {
    this._router.navigate([`/create`]);
  }
  EditEmployeeNavigate(id: string) {
    this._router.navigate([`/edit/${id}`]);
  }
}
