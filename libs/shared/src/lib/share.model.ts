import { DateTime } from 'luxon';

export interface User {
  userId: string;
  username: string;
  email: string;
  name: string;
  lname: string;
  personalNumber: string;
  department: Department;
  role: Role;
  roleArticle: RoleArticle;
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
  roleArticle: RoleArticle;
}
export interface RoleArticle {
  rolearcId: string;
  rolearcName: string;
  rolearcAddUpdate: string;
  rolearcDelete: string;
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
  accArticle: string;
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
  roleArticle: RoleArticle;
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
  datareturn: DataReturn[];
}
export interface PublishDataResponse extends DefaultResponse {
  datareturn: DataReturn[];
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
  provinceCode: string;
  provinceName: string;
  zoneName: string;
  createInfoDate: string;
  createDate: string;
  updateDate: string;
  picture: any;
  tempPicture?: any;
  hasHistory?: boolean;
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
  roleArc: string;
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
export interface AdminArticleRoleListResponse extends DefaultResponse {
  RoleArticle: RoleArticle[];
}
export interface AdminRoleListResponse extends DefaultResponse {
  Role: Role[];
}
export interface DataServiceDetailResponse extends DefaultResponse {
  apiId: string;
  apiName: string;
  apiDetail: string;
  apiLink: string;
  departmentName: string;
  privacyName: string;
  tType: string;
  catName: string;
  groupsName: string;
  countview: string;
  zone: string;
  jsonField: string;
  createInfoDate: string;
  createDate: string;
  updateDate: string;
  picture: any;
  tempPicture?: any;
  tokenKey: string;
}
export interface DataServiceDetail {
  apiId: string;
  apiName: string;
  apiDetail: string;
  apiLink: string;
  departmentName: string;
  privacyName: string;
  tType: string;
  catName: string;
  groupsName: string;
  countview: string;
  zone: string;
  createInfoDate: string;
  createDate: string;
  updateDate: string;
  picture: any;
  tokenKey: string;
  tempPicture?: any;
  jsonField: string;
}

export interface DataRequest {
  reqId: string;
  reqName: string;
  reqDescription: string;
  reqFile: string;
  reqCreate: string;
  reqApprove: string;
  departmentName: string;
  catName: string;
}
export interface DataRequestResponse extends DefaultResponse {
  datareturn: DataRequest[];
}
export interface DataRequestSecretary extends DataRequest {
  userId: '161';
  name: 'ทดสอบ2';
  lname: 'ระบบ2';
  name_en: 'test2';
  lname_en: 'system2';
  departmentNameExternal: 'กรมจัด';
}

export interface DataRequestSecretaryResponse extends DefaultResponse {
  datareturn: DataRequestSecretary[];
}

export interface DataRequestRequest {
  depId: string;
  reason: string;
  secUserId: string;
  approve: string;
  reqId: string;
}
export interface AdminDepartment {
  departmentId: string;
  departmentName: string;
  departmentMember: string;
}
export interface AdminDepartmentResponse extends DefaultResponse {
  datareturn: AdminDepartment[];
}

export interface ReportByDate {
  count: number;
  timeline: string;
}
export interface ReportByUser {
  count: number;
  role: string;
}
export interface AdminReportByUserResponse extends DefaultResponse {
  datareturn: ReportByUser[];
}
export interface AdminReportByDateResponse extends DefaultResponse {
  datareturn: ReportByDate[];
}
export interface LineReport {
  name: string;
  series: LineReportSerie[];
}
export interface LineReportSerie {
  name: string;
  value: number;
}
export interface SaoApiService {
  tokenId: string;
  tokenCode: string;
  status: string;
  createDate: string;
  expireDate: string;
  countDate: string;
  apiName: string;
  apiDetail: string;
  apiDepartmentName: string;
  zone: string;
  name: string;
  lname: string;
  name_en: string;
  lname_en: string;
  departmentName: string;
  departmentNameExternal: string;
  maxLimit: string;
  timePeriod: string;
}
export interface SaoApiServiceResponse extends DefaultResponse {
  datareturn: SaoApiService[];
}
export interface SaoGlobal {
  sId: string;
  maxCallsLimit: string;
  timePeriod: string;
}
export interface SaoGlobalResponse extends DefaultResponse {
  SoaConfig: SaoGlobal[];
}

export interface InsertApiRequest {
  privacyId: string;
  apiName: string;
  attribute: string | null;
  active: string;
  departmentId: string;
  typeId: string;
  zone: string;
  catId: string;
  groupsId: string;
  apiDetail: string;
  apiLink: string;
  formatType: string;
  jsonField: string;
}
export interface UpdateApiRequest extends InsertApiRequest {
  apiId: string;
}
export interface Privacy {
  privacyId: number;
  privacyName: string;
}
export interface PrivacyResponse {
  Privacy: Privacy[];
}
export interface DataType {
  tId: number;
  tType: string;
}
export interface DataTypeResponse {
  TypeData: DataType[];
}
export interface CategoryGroup {
  groupsId: number;
  groupsName: string;
}
export interface CategoryGroupResponse {
  Groups: CategoryGroup[];
}

export interface AdminLog {
  logsId: string;
  ipAddress: string;
  logsCreate: string;
  apiId: string;
  apiName: string;
  apiDetail: string;
  zone: string;
  formatType: string;
  username: string;
  name: string;
  lname: string;
  name_en: string;
  lname_en: string;
  email: string;
  personalNumber: string;
  departmentNamePublic: string;
  departmentName: string;
}

export interface AdminLogResponse extends DefaultResponse {
  datareturn: AdminLog[];
}

export interface AdminData {
  tokenId: string;
  tokenCode: string;
  status: string;
  createDate: string;
  expireDate: string;
  countDate: string;
  apiName: string;
  apiDetail: string;
  apiDepartmentName: string;
  zone: string;
  name: string;
  lname: string;
  name_en: string;
  lname_en: string;
  departmentName: string;
  departmentNameExternal: string;
  maxLimit: string;
  timePeriod: string;
}

export interface AdminDataResponse extends DefaultResponse {
  datareturn: AdminData[];
}
export interface Province {
  provinceCode: string;
  provinceName: string;
  zoneName: string;
}

export interface ProvinceResponse extends DefaultResponse {
  Province: Province[];
}
export interface TokenPublicResponse extends DefaultResponse {
  email: string;
  tokenKey: string;
}
export interface Zone {
  ZONE_NAME: string;
}

export interface ZoneResponse extends DefaultResponse {
  dbZoneNameOutput: Zone[];
}
export interface ApiType {
  tId: string;
  tType: string;
}

export interface ApiTypeResponse extends DefaultResponse {
  TypeData: ApiType[];
}
export interface CheckFile {
  tfId: string;
  tfRef: string;
  tfFileName: string;
  tfTimestamp: string;
  tfFlag: string;
}
export interface CheckFileResponse extends DefaultResponse {
  tfId: string;
  tfRef: string;
  tfFileName: string;
  tfTimestamp: string;
  tfFlag: string;
  tfZipB64: string;
}

export interface RequestApiUser {
  reqId: string;
  reqName: string;
  reqDescription: string;
  reqFile: string;
  reqCreate: string;
  reqApprove: string;
  departmentName: string;
  catName: string;
}

export interface RequestApiUserResponse extends DefaultResponse {
  datareturn: RequestApiUser[];
}
export interface RequestApiFile {
  rfId: string;
  rfName: string;
  rfMime: string;
  rfTransaction: string;
  rfUserId: string;
  rfTimestamp: string;
}

export interface RequestApiFileResponse extends DefaultResponse {
  datareturn: RequestApiFile[];
}
export interface RequestApiFileView extends RequestApiFile {
  rfData: string;
}

export interface RequestApiFileViewResponse extends DefaultResponse {
  rfId: string;
  rfName: string;
  rfMime: string;
  rfTransaction: string;
  rfUserId: string;
  rfData: string;
  rfTimestamp: string;
}
export interface RequestApiSecretary {
  reqId: string;
  userId: string;
  reqName: string;
  reqDescription: string;
  reqFile: string;
  reqCreate: string;
  reqApprove: string;
  catName: string;
  name: string;
  lname: string;
  name_en: string;
  lname_en: string;
  departmentName: string;
  departmentNameExternal: string;
}

export interface RequestApiSecretaryResponse extends DefaultResponse {
  datareturn: RequestApiSecretary[];
}
export interface RequestApiData {
  apiName: string;
  apiDetail: string;
  zone: string;
  status: string;
  userId: string;
  name: string;
  lname: string;
  name_en: string;
  lname_en: string;
  departmentName: string;
  departmentNameExternal: string;
  tokenId: string;
}

export interface RequestApiDataResponse extends DefaultResponse {
  datareturn: RequestApiData[];
}
export interface NewsCategory {
  link: string;
  title: string;
  description: string;
  category: string;
  lastBuildDate: string;
  language: string;
  item: News[];
}
export interface News {
  title: string;
  description: string;
  link: string;
  category: string;
  pubDate: string;
}

export interface ApiStatisticResponse extends DefaultResponse {
  dbAPIStaticOutput: ApiStatistic[];
}
export interface ApiStatistic {
  API_NAME: string;
  COUNTDATA: number;
}
export interface ArticleResponse extends DefaultResponse {
  datareturn: Article[];
}
export interface ArticleDetailResponse {
  tid: string;
  topic: string;
  thumbnail: string;
  tempThumbnail?: any;
  description: string;
  countview: number;
  createby: string;
  createdate: string;
  returnCode?: string;
  returnMessage?: string;
}
export interface Article {
  tid: string;
  topic: string;
  thumbnail: string;
  countview: number;
  description: string;
  createby: string;
  createdate: string;
  tempThumbnail?: string;
}

export interface CategoryStatisticResponse extends DefaultResponse {
  dbCATStaticOutput: CategoryStatistic[];
}
export interface CategoryStatistic {
  CAT_NAME: string;
  COUNTDATA: number;
}
export interface DepartmentStatisticResponse extends DefaultResponse {
  dbDEPStaticOutput: DepartmentStatistic[];
}
export interface DepartmentStatistic {
  DEPARTMENT_NAME: string;
  COUNTDATA: number;
}
export interface ProvinceStatisticResponse extends DefaultResponse {
  dbPROVStaticOutput: ProvinceStatistic[];
}
export interface ProvinceStatistic {
  PROVINCE_NAME: string;
  COUNTDATA: number;
}
export interface FileHistoryResponse extends DefaultResponse {
  datareturn: FileHistory[];
}
export interface FileHistory {
  hid: string;
  apiId: string;
  fileName: string;
  originalFileName: string;
  timestamp: string;
}
