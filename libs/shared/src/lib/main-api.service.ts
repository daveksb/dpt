import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/dpt-ui/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainApiService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const url = `dptlogin/login?username=${username}&password=${password}`;

    return this.http.get<any>(`${environment.apiPrefix}/${url}`, {});
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

export interface userLogin {
  //   {
  //   "returnCode" : "00",
  //   "returnMessage" : "ดำเนินการสำเร็จ",
  //   "userId" : "102",
  //   "username" : "admin",
  //   "email" : "test@test.com",
  //   "name" : "ทดสอบ",
  //   "lname" : "ระบบ",
  //   "personalNumber" : "021234567",
  //   "tokenKey" : "9zhrZzSpirb5KbLTzWKDhTxXiY3hn03abkXdbsR1YUX5t00XMvzhYd0pXkY00zPJczIlTdQYqhiahKuvTBOMruQzV1qorhGAUfPMrdvDchIFoIlrlnZFt3Ix1yZKKWZKMynYnqy1jWSf3Bq9kPtkOOxQdpX3zU0o3v5czjnVKrkviyE3OTvZkWbpoLanLMkPS19Bldcu",
  //   "department" : {
  //     "departmentId" : "1",
  //     "departmentName" : "IT"
  //   },
  //   "role" : {
  //     "roleId" : "1",
  //     "roleName" : "ทั้งหมด",
  //     "accessControl" : {
  //       "accId" : "1",
  //       "accName" : "ทั้งหมด",
  //       "accApi" : "T",
  //       "accReq" : "T",
  //       "accAdd" : "T",
  //       "accApproveApi" : "T",
  //       "accSetApi" : "T",
  //       "accApproveWeb" : "T",
  //       "accSetWeb" : "T"
  //     }
  //   }
  // }
}
