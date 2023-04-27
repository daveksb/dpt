import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/dpt-ui/src/environments/environment';
import {
  AdminArticleRoleListResponse,
  AdminDataResponse,
  AdminDepartmentResponse,
  AdminLogResponse,
  AdminReportByDateResponse,
  AdminReportByUserResponse,
  AdminRoleListResponse,
  AdminUserListResponse,
  ApiStatisticResponse,
  ApiTypeResponse,
  ArticleDetailResponse,
  ArticleResponse,
  CategoryGroupResponse,
  CategoryStatisticResponse,
  CheckFileResponse,
  DataRequest,
  DataRequestResponse,
  DataRequestSecretaryResponse,
  DataServiceDetailResponse,
  DataServiceResponse,
  DataTypeResponse,
  DefaultResponse,
  DepartmentStatisticResponse,
  FileHistoryResponse,
  PrivacyResponse,
  ProvinceResponse,
  ProvinceStatisticResponse,
  PublishDataResponse,
  RequestApiDataResponse,
  RequestApiFileResponse,
  RequestApiFileViewResponse,
  RequestApiSecretaryResponse,
  RequestApiUser,
  RequestApiUserResponse,
  SaoApiServiceResponse,
  SaoGlobalResponse,
  TokenPublicResponse,
  UserResponse,
  ZoneResponse,
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
    return this.http.post<any>(
      `https://cockpit.dpt.go.th/mail/dptsendemail.php`,
      body
    );
  }

  getPublicDataList() {
    const url = `dptrequest/getservicedatapublic?`;
    return this.http.get<DataServiceResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getRequestedData() {
    const url = `dptrequest/getservicedatapublicuse?`;
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
  updateAdminDataSet(body: any) {
    const url = `dptuser/updatemanageapiservice`;
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
  deleteAdminDataSet(body: any) {
    const url = `dptuser/deletemanageapiservice`;
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
  getAdminArticleRoleList() {
    const url = `dptuser/rolearticle?`;
    return this.http.get<AdminArticleRoleListResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getLandingList() {
    const url = `/dptlogin/apidatapublic?`;
    return this.http.get<DataServiceResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getDataServiceDetail(apiId: string, userId: string) {
    const url = `dptrequest/getservicedatapublicpertime?apiId=${apiId}&&userId=${userId}`;
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
  getAdminDatatList() {
    const url = `dptuser/selectmanageapiservice?`;
    return this.http.get<AdminDataResponse>(`${environment.apiPrefix}/${url}`);
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
  getSaoList() {
    const url = `dptuser/selectmanageapiservice?`;
    return this.http.get<SaoApiServiceResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getSaoGlobal() {
    const url = `dptuser/selectsoaconfig?`;
    return this.http.get<SaoGlobalResponse>(`${environment.apiPrefix}/${url}`);
  }
  updateSaoConfig(body: any) {
    const url = `dptuser/updatesoaconfigperuser?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  updateSaoGlobalConfig(body: any) {
    const url = `dptuser/updatesoaconfig?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  getReportByDate(startDate: string, endDate: string, apiId: string) {
    const url = `dptreport/reportapipertime?apiId=${apiId}&startDate=${startDate}&endDate=${endDate}
    `;
    return this.http.get<AdminReportByDateResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getAdminLogByDate(startDate: string, endDate: string) {
    const url = `dptuser/selectlogapi?&startDate=${startDate}&endDate=${endDate}
    `;
    return this.http.get<AdminLogResponse>(`${environment.apiPrefix}/${url}`);
  }
  getReportByUser(startDate: string, endDate: string, apiId: string) {
    const url = `dptreport/reportapiperrole?apiId=${apiId}&startDate=${startDate}&endDate=${endDate}
      `;
    return this.http.get<AdminReportByUserResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }

  getDataByDepartment(departmentId: string) {
    const url = `dptrequest/servicedatadepartment?depId=${departmentId}`;
    return this.http.get<PublishDataResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getDataByDepartmentNew(departmentId: string) {
    const url = `dptrequest/selectdatadepartment?depId=${departmentId}`;
    return this.http.get<PublishDataResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }

  getPrivacy() {
    const url = `dptrequest/selectprivacy`;
    return this.http.get<PrivacyResponse>(`${environment.apiPrefix}/${url}`);
  }
  getCategoryGroup() {
    const url = `dptrequest/selectgroups`;
    return this.http.get<CategoryGroupResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getDataType() {
    const url = `dptrequest/selecttypedata`;
    return this.http.get<DataTypeResponse>(`${environment.apiPrefix}/${url}`);
  }
  getProvinces() {
    const url = `dptrequest/selectprovince`;
    return this.http.get<ProvinceResponse>(`${environment.apiPrefix}/${url}`);
  }
  getZones() {
    const url = `dptrequest/zonename`;
    return this.http.get<ZoneResponse>(`${environment.apiPrefix}/${url}`);
  }
  getApiType() {
    const url = `dptrequest/selecttypedata`;
    return this.http.get<ApiTypeResponse>(`${environment.apiPrefix}/${url}`);
  }
  getTokenPublic(body: any) {
    const url = `dptrequest/insertapitokenpublic`;
    return this.http.post<TokenPublicResponse>(
      `${environment.apiPrefix}/${url}`,
      {
        ...body,
      }
    );
  }

  addApiData(body: any) {
    const url = `dptrequest/insertapidepartment?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  updateApiData(body: any) {
    const url = `dptrequest/updateapidepartment?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  deleteApiData(body: any) {
    const url = `/dptrequest/servicedataprivatedepdelete?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  insertFileTemp(body: any) {
    const url = `dptrequest/inserttempfile?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  selectFileTemp(refId: string) {
    const url = `dptrequest/selecttempfile`;
    return this.http.get<CheckFileResponse>(
      `${environment.apiPrefix}/${url}?refId=${refId}`
    );
  }

  getRequestApiUser() {
    const url = `dptrequest/selectrequser?`;
    return this.http.get<RequestApiUserResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }

  getRequestApiUserFile(rfTransaction: string, rfUserId: string) {
    const url = `dptrequest/selectrequestapifile?rfTransaction=${rfTransaction}&rfUserId=${rfUserId}`;
    return this.http.get<RequestApiFileResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }

  getRequestApiFileView(rfId: string) {
    const url = `dptrequest/selectrequestapiperfile?rfId=${rfId}`;
    return this.http.get<RequestApiFileViewResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }

  getRequestApiSecretary() {
    const url = `dptrequest/selectreqsecre?`;
    return this.http.get<RequestApiSecretaryResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getRequestApiDepart(depId: string) {
    const url = `dptrequest/selectreqdepart?depId=${depId}`;
    return this.http.get<RequestApiSecretaryResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getRequestApiData(depId: string) {
    const url = `dptrequest/selectreqdepartprivate?depId=${depId}`;
    return this.http.get<RequestApiDataResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  updateApproval(body: any) {
    const url = `dptrequest/approvesecretary?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  updateApprovalDepartment(body: any) {
    const url = `dptrequest/approvedepartment?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  updateApprovalDepartmentPrivate(body: any) {
    const url = `dptrequest/approvedepartmentprivate?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  updateUserStatus(body: any) {
    const url = `dptuser/updateflaguser?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  deleteUser(body: any) {
    const url = `dptuser/deleteuser?`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }

  getFile(token: string) {
    return this.http.get<any>(
      `${'http://38.242.138.3/dpt/dptapiaccess.php?filetokenkey='}${token}`
    );
  }
  editUserInfo(body: any) {
    const url = `dptlogin/changepasswordandemail`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  editRoleAccess(body: any) {
    const url = `dptuser/changeaccesscontrol`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  editArticleRoleAccess(body: any) {
    const url = `dptuser/changerolearticle`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }

  getArticle() {
    const url = `dptreport/listtopic`;
    return this.http.get<ArticleResponse>(`${environment.apiPrefix}/${url}`);
  }
  getArticleDetail(tid: string) {
    const url = `dptreport/listdetailtopic?tid=${tid}`;
    return this.http.get<ArticleDetailResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  editArticle(body: any) {
    const url = `dptreport/updatetopic`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  deleteArticle(body: any) {
    const url = `dptreport/deletetopic`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  addArticle(body: any) {
    const url = `dptreport/inserttopic`;
    return this.http.post<DefaultResponse>(`${environment.apiPrefix}/${url}`, {
      ...body,
    });
  }
  getApiStatistic() {
    const url = `dptreport/apiStatistic`;
    return this.http.get<ApiStatisticResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getCategoryStatistic() {
    const url = `dptreport/categoryStatistic`;
    return this.http.get<CategoryStatisticResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getDepartmentStatistic() {
    const url = `dptreport/departmentStatistic`;
    return this.http.get<DepartmentStatisticResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getProvinceStatistic() {
    const url = `dptreport/provinceStatistic`;
    return this.http.get<ProvinceStatisticResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  getSelectHistoryfile(apiId: string) {
    const url = `dptservice/selecthistoryfile?apiId=${apiId}`;
    return this.http.get<FileHistoryResponse>(
      `${environment.apiPrefix}/${url}`
    );
  }
  deleteSelectHistoryfile(body: any) {
    const url = `https://cockpit.dpt.go.th/9A5387D3066CAD4D72E2B730A7456639E97E5C6D/dptdeletehistoryfile.php`;
    return this.http.post<DefaultResponse>(`${url}`, {
      ...body,
    });
  }
}
