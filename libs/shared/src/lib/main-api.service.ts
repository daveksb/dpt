import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/dpt-ui/src/environments/environment';
import { UserResponse } from './share.model';

@Injectable({
  providedIn: 'root',
})
export class MainApiService {
  constructor(private http: HttpClient) {}
  login(username: string, password: string) {
    const url = `dptlogin/login?username=${username}&password=${password}`;
    return this.http.get<UserResponse>(`${environment.apiPrefix}/${url}`, {});
  }
  register(body: any) {
    const url = `dptlogin/register`;
    return this.http.post<any>(`${environment.apiPrefix}/${url}`, body);
  }
  getDepartment() {
    const url = `dptlogin/selectdepartment`;
    return this.http.get<any>(`${environment.apiPrefix}/${url}`);
  }
  forgotPassword(body: any) {
    const url = `dptlogin/register`;
    return this.http.post<any>(`${environment.apiPrefix}/${url}`, body);
  }
}
