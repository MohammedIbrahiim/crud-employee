import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

const routes: Routes = [
  { path: '', redirectTo: 'Employee', pathMatch: 'full' },
  {
    path: 'Employee',
    loadComponent: () =>
      import('../employee/component/employee/employee.component').then(
        (c) => c.EmployeeComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('../employee/component/create-user/create-user.component').then(
        (c) => c.CreateUserComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../employee/component/create-user/create-user.component').then(
        (c) => c.CreateUserComponent
      ),
      resolve: {
        employeeDetails: (
          route: ActivatedRouteSnapshot
        ) => {
          const id = route.paramMap.get('id') ?? '';
          console.log(id);
          
          const employeeService = inject(EmployeeService);
          return employeeService.getEmployeeById(id);
        },
      },
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import(
        '../employee/component/employee-details/employee-details.component'
      ).then((c) => c.EmployeeDetailsComponent),
    resolve: {
      employeeDetails: (
        route: ActivatedRouteSnapshot
      ) => {
        const id = route.paramMap.get('id') ?? '';
        const employeeService = inject(EmployeeService);
        return employeeService.getEmployeeById(id);
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
