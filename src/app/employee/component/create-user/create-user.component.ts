import { Component, Input } from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgFor, NgIf, NgClass } from '@angular/common';
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  nameButton: string = 'Submit';

  @Input() id: string = '';
  constructor(
    private _employeeService: EmployeeService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  createUserForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    this._route.data.subscribe({
      next: (res) => {
        this.createUserForm.patchValue(res['employeeDetails']);
        this.nameButton = !this.id ? 'Submit' : 'Edit';
      },
    });
  }

  addEmployee(formInfo: FormGroup) {
    this._employeeService.addEmployee(formInfo.value).subscribe((res) => {
      this._router.navigate(['/Employee']);
    });
  }
  editEmployee(formInfo: FormGroup) {
    this._employeeService.updateEmployee(formInfo.value).subscribe((res) => {
      this._router.navigate(['/Employee']);
    });
  }

  goBack() {
    this._router.navigate(['/Employee']);
  }
}
