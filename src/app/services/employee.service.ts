import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interface/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseurl: string = `https://task-dot-fe-task-428108.uc.r.appspot.com/employees`
  constructor(private _HttpClient:HttpClient) { }
  getEmployee(): Observable<Employee[]> {
    return this._HttpClient.get<Employee[]>(this.baseurl);
  }
  addEmployee(user:Employee): Observable<Employee[]> {
    return this._HttpClient.post<Employee[]>(this.baseurl,user);
  }
  updateEmployee(user:Employee): Observable<Employee[]> {
    return this._HttpClient.put<Employee[]>(this.baseurl,user);
  }
  getEmployeeById(id:string): Observable<Employee[]> {
    return this._HttpClient.get<Employee[]>(this.baseurl+`/${id}`);
  }
  deleteEmployeeById(id:string): Observable<Employee[]> {
    return this._HttpClient.delete<Employee[]>(this.baseurl+`/${id}`);
  }
}
