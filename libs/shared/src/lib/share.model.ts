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
}
