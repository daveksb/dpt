import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/dpt-ui/src/environments/environment';
import {
  AdminDepartmentResponse,
  AdminReportByDateResponse,
  AdminReportByUserResponse,
  AdminRoleListResponse,
  AdminUserListResponse,
  DataRequest,
  DataRequestResponse,
  DataRequestSecretaryResponse,
  DataServiceDetailResponse,
  DataServiceResponse,
  DefaultResponse,
  PublishDataResponse,
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
    return this.http.get<any>(`${environment.apiPrefix}/${url}`, {});
  }
  getCategory() {
    const url = `dptrequest/selectcategory`;
    return this.http.get<any>(`${environment.apiPrefix}/${url}`, {});
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
  addAdminDepartment(body: any) {
    const url = `dptuser/insertdepartment`;
    return this.http.post<DefaultResponse>(
      `${environment.apiPrefix}/${url}`,
      body
    );
  }
  updateAdminDepartment(body: any) {
    const url = `dptuser/updatedepartment`;
    return this.http.post<DefaultResponse>(
      `${environment.apiPrefix}/${url}`,
      body
    );
  }
  deleteAdminDepartment(body: any) {
    const url = `dptuser/deletedepartment`;
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
  getLandingList() {
    const url = `/dptlogin/apidatapublic?`;
    return this.http.get<DataServiceResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getDataServiceDetail(apiId: string) {
    const url = `dptrequest/getservicedatapublicpertime?apiId=${apiId}`;
    return this.http.get<DataServiceDetailResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }

  getPublishList() {
    const url = `dptrequest/servicedatabroadcast?`;
    return this.http.get<PublishDataResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getAdminDepartmentList() {
    const url = `dptuser/selectdepartment?`;
    return this.http.get<AdminDepartmentResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  updatePublishStatus(apiId: string, status: string) {
    const url = `dptrequest/servicedataprivateapprove?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      apiId,
      status,
    });
  }
  updateRequestStatus(body: DataRequest) {
    const url = `dptrequest/servicedataprivateapprove?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  getUserDataService() {
    const url = `dptrequest/selectrequser?`;
    return this.http.get<DataRequestResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getSecretaryDataService() {
    const url = `dptrequest/selectreqsecre?`;
    return this.http.get<DataRequestSecretaryResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getOwnerDataService(departmentId: string) {
    const url = `dptrequest/selectreqdepart?depId=${departmentId}`;
    return this.http.get<DataRequestSecretaryResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getReportByDate(startDate: string, endDate: string, apiId: string) {
    const url = `dptreport/reportapiperrole?apiId=${apiId}&startDate=${startDate}&endDate=${endDate}
    `;
    return this.http.get<AdminReportByDateResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getReportByUser(startDate: string, endDate: string, apiId: string) {
    console.log(startDate);
    const url = `dptreport/reportapiperrole?apiId=${apiId}&startDate=${startDate}&endDate=${endDate}
    `;
    return this.http.get<AdminReportByUserResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
}
