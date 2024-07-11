import { Component,OnInit } from '@angular/core';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { Employee } from '../../../interface/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {
  dataSource = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['name', 'position', 'department', 'salary'];
  constructor( private _route:ActivatedRoute ,private _router:Router){}
  ngOnInit(): void {
    this._route.data.subscribe({
      next: (res) => {        
        this.dataSource = new MatTableDataSource<Employee>([res['employeeDetails']])
      }
    })
  }


  goBack(){
    this._router.navigate(['/Employee'])
  }



}

