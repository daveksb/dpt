import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/dpt-ui/src/environments/environment';
import {
  AdminRoleListResponse,
  AdminUserListResponse,
  DataServiceResponse,
  DefaultResponse,
  UserResponse,
} from './share.model';

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
  getCategory() {
    const url = `dptrequest/selectcategory`;
    return this.http.get<any>(`${environment.apiPrefix}/${url}`);
  }
  forgotPassword(body: any) {
    const url = `dptlogin/register`;
    return this.http.post<any>(`${environment.apiPrefix}/${url}`, body);
  }

  getPublicDataList() {
    const url = `dptrequest/getservicedatapublic?`;
    return this.http.get<DataServiceResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getPrivateDataList() {
    const url = `dptrequest/servicedataprivate?`;
    return this.http.get<DataServiceResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  uploadFile(body: any) {
    const url = `dptrequest/insertrequestapifile?`;
    return this.http.post<DefaultResponse>(
      `${environment.apiPrefix}/${url}`,
      body
    );
  }
  deleteFile(body: any) {
    const url = `dptrequest/deleterequestapifile?`;
    return this.http.post<DefaultResponse>(
      `${environment.apiPrefix}/${url}`,
      body
    );
  }

  addRequestApi(body: any) {
    const url = `dptrequest/insertrequestapi?`;
    return this.http.post<DefaultResponse>(
      `${environment.apiPrefix}/${url}`,
      body
    );
  }
  getAdminUserList() {
    const url = `dptuser/selectuser?`;
    return this.http.get<AdminUserListResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getAdminRoleList() {
    const url = `dptuser/roleuser?`;
    return this.http.get<AdminRoleListResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
}
