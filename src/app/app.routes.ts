import { Routes } from '@angular/router';

export const routes: Routes = [


    {path:'' , loadChildren:()=> import('../app/employee/employee.module').then(c=>c.EmployeeModule)},

];
