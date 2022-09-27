export interface User {
  userId: string;
  username: string;
  email: string;
  name: string;
  lname: string;
  personalNumber: string;
  department: Department;
  role: Role;
  tokenKey: string;
  departmentExternal: string;
  nameEn: string;
  lnameEn: string;
  position: string;
}
export interface Department {
  departmentId: string;
  departmentName: string;
}
export interface Role {
  roleId: string;
  roleName: string;
  accessControl: AccessControl;
}
export interface AccessControl {
  accId: string;
  accName: string;
  accApi: string;
  accReq: string;
  accAdd: string;
  accApproveApi: string;
  accSetApi: string;
  accApproveWeb: string;
  accSetWeb: string;
  accDepartment: string;
  accEdit: string;
  accSetAccess: string;
  accManageUser: string;
  accApproveService: string;
}
export interface DefaultResponse {
  returnCode: string;
  returnMessage: string;
}

export interface UserResponse extends DefaultResponse {
  userId: string;
  username: string;
  email: string;
  name: string;
  lname: string;
  personalNumber: string;
  department: Department;
  role: Role;
  tokenKey: string;
  departmentExternal: string;
  nameEn: string;
  lnameEn: string;
  position: string;
}
export interface RegisterRequest {
  depId?: string | null;
  depName?: string | null;
  roleId?: string | null;
  usr?: string | null;
  pwd?: string | null;
  pid?: string | null;
  name?: string | null;
  lname?: string | null;
  ename?: string | null;
  email?: string | null;
  position?: string | null;
  name_en?: string | null;
  lname_en?: string | null;
  tel?: string | null;
}
export interface DataServiceResponse extends DefaultResponse {
  datareturn: [];
}
export interface DataReturn {
  apiId: string;
  apiName: string;
  apiDetail: string;
  departmentName: string;
  privacyName: string;
  tType: string;
  catName: string;
  groupsName: string;
  countView: string;
  formatType: string;
  status: string;
  zone: string;
}
export interface Category {
  catId: number;
  catName: string;
}
export interface AdminUserListResponse extends DefaultResponse {
  datareturn: AdminUserList[];
}
export interface AdminUserList {
  userId: string;
  username: string;
  email: string;
  name: string;
  lname: string;
  name_en: string;
  lname_en: string;
  personalNumber: string;
  approve: string;
  createDate: string;
  updateDate: string;
  position: string;
  departmentNamePublic: string;
  departmentName: string;
  roleName: string;
}
