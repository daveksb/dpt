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
