import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MainApiService, UserService } from '@dpt/shared';
import { DataServiceDialogComponent, DefaultDialogComponent } from '@dpt/form';
import { DomSanitizer } from '@angular/platform-browser';
import { DataServiceDetail } from '@dpt/shared';
import { atob, Base64 } from 'js-base64';

export interface DataService {
  topic: string;
  category: string;
  department: string;
  dataList: DataList[];
  view: number;
  detail1: string;
  detail2: string;
  api: Api;
}
export interface DataList {
  dataType: string;
  dataId: number;
  dataLink: string;
}
export interface Api {
  apiUrl: string;
  apiParams: ApiParam[];
  connectionString: string;
  dataRequestExample: string;
  javascriptExample: string;
}
export interface ApiParam {
  name: string;
  type: string;
  description: string;
  default: string;
}

@Component({
  selector: 'dpt-data-service-detail',
  templateUrl: './data-service-detail.component.html',
  styleUrls: ['./data-service-detail.component.scss'],
})
export class DataServiceDetailComponent implements OnInit {
  apiList = ['api', 'wps', 'wfs', 'wms'];

  data: DataService = {
    topic: 'กฎกระทรวงผังเมืองรวมจังหวัด',
    category: 'การจำแนกการใช้ที่ดิน',
    department: 'สำนักผังประเทศและผังภาค',
    dataList: [
      {
        dataType: 'CSV',
        dataId: 11,
        dataLink: 'test',
      },
      {
        dataType: 'PDF',
        dataId: 12,
        dataLink: 'test',
      },
    ],
    view: 10,
    detail1: 'test',
    detail2: 'test',
    api: {
      apiUrl: 'test',
      apiParams: [
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
        {
          name: 'test',
          type: 'test',
          description: 'test',
          default: 'test',
        },
      ],

      connectionString: 'test',
      dataRequestExample: 'test',
      javascriptExample: 'test',
    },
  };
  // apiParams = [
  //   {
  //     name: 'test1',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  //   {
  //     name: 'test',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  //   {
  //     name: 'test',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  //   {
  //     name: 'test',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  //   {
  //     name: 'test',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  //   {
  //     name: 'test',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  //   {
  //     name: 'test',
  //     type: 'test',
  //     description: 'test',
  //     default: 'test',
  //   },
  // ];
  apiDetail: DataServiceDetail | null = null;
  displayedColumns: string[] = ['name', 'type', 'description', 'default'];
  dataSource = new MatTableDataSource(this.data.api.apiParams);
  displayedZipColumns: string[] = ['name', 'size'];
  dataSourceZip = new MatTableDataSource<any>();
  mainUrl = 'http://38.242.138.3/dpt/dptapiaccess.php?filetokenkey=';
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private mainApiService: MainApiService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}
  ngOnInit(): void {
    const apiId = this.route.snapshot.params['id'];
    const userId = this.userService.getUser()?.userId ?? '';
    this.mainApiService.getDataServiceDetail(apiId, userId).subscribe({
      next: (res) => {
        if (res.returnCode === '00' || res.returnCode === '01') {
          //
          const { returnCode, returnMessage, ...rest } = res;
          if (rest.picture) {
            const base64String = atob(rest.picture);
            rest.tempPicture =
              this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
          }
          this.apiDetail = rest;

          if (this.apiDetail.tType === 'zip') {
            try {
              const a = this.apiDetail.jsonField;
              // const a =
              //   'eyJkYXRhIjoiSWxwWWJFdGhNV3haVlcxb1NtRnRPWEJWTVdRMFlXMVdkRlJZYkdobGEwcFdWV3BL\nTkZSV1VuSldhbEpxVWxSRk1sWlhjM2hoVmxwWVl6TmtWMUpYVW5wVVZWVXhVbTFXU1ZWc1RsZFNh\nM0JQVjFaYWExZHJNVWRWYTJocFUwVTFVRlZzYUc5TlFYQlhVbXhhZWxreFpFcGxWMHBJWkVaT1Rs\nWnRPSGxXTW5SWFZERkdkRlZyV21sU1ZuQldXVzE0ZDJOV1ZYZGFSRUpwWWtVeE0xWlhjekZoYkVw\nWllVUkdWbFo2VmxoWFZtUlhWbTFLU1dOR1VsaFNiSEJHVmtkMGEyRXdNVmRTYWxwV1lteEthRU5z\nV2xaTlNHUmFaV3MxV0ZWclZURlRSMVpIVVd4S2JHSkdjREpXYTFKRFZHc3hTRk51UW10U1ZrcFFW\nVEJXUzJNeFZsbGpSbVJxVm10V00xbFljRXRXUmxsNlVXczVZVlpzVlhoVWJYaHJWbFpHY2s1WGFG\nZFdXRUl6VmpKNFlXSXhWWGxUYTJkTFZrZHdWMVpIUm5SbFJUVldUVWRvVUZrd1ZURlNiVlpKVVd4\nU2JHSkZjRTlYVmxwVFZHc3hSMVZyYUU1V1dFSlFWV3hvYjJReGNFWlZiRTVWVmpCd1YxWnNVa05X\nVmtsNVpVaFNWV0V4V1RCWk1HUkxVbFpXY2sxWGJGZFdSVnBNVjFaamQwNVJjR3BTYmtKSFYydGFh\nMkpIU2xkVGExWldWbTFvVkZVeWVFdFdhelZWVTJ4d1RsSXlhRFZYYTFwclZERk9SazVXYUU5V1dF\nSnZWakJrVTJReFVuSldhbEpxVW10Wk1sWlhjM2hoUmxwMFQwaGtWMUpYVW5wVWJGVXhVbTFXU1ZG\nc1pGZFNhM0JQUTJ4c2MxWnNXazVTYkVwSldXdGplRlF4U2xsaFNHUmFZVEZLVkZaR1pFdFdhekZX\nWTBkb2FWWkhlRE5XYTFwdlpERk9jazFJWkU5WFJWcFhWakJrTkZNeFZuRlJibHBPVm01Q1IxZHJX\nbXRpUjBWNVpVUkdWVlpYYUZCWmEyUlhWbTFXU0U1WGMwdFdiR1EwVGxaa2NWUnNaRlZXYmtJd1Yy\ndFNSMWRHV1hwUmJsWmhVbXhhTmxwWGVIWmxiRnB6WTBaa1UwMXNSalJXVkVweVRsZEtkRlZzV210\nU2JYaG9WRlJHWVZsV2NFVlRiazVXVWpCYVYxbHFUbXRYUjBwSVlVWkNWVlpXV1RCYVJscEhaRkZ3\nVjJKVlduTldiR1EwVG14VmVHRkdaRk5TVkZaSlYydFNSMVZ0Vm5OVGFrSllZa1phVDFSVlpFNWxi\nRnB5VldzNVUwMHlhRkpXVm1oM1ZqSkplRlZZWkZWV1JVcHdXVlpvVTFKV1VuSmhSVTVwVW10Wk1s\nWnROVWRWYXpGSVl6TnNWazFYVWpORGJGSjBWbXhhVDFaR2NGbFdhMVpMVkRGc1YxWnJkR3BTYmtK\nWVdWVmFUMkZXU1hkT1JFWldUVzVDZWxZeFdsZFdWVEZGWWtWd1lXVnFRVFZUVnpSM1VGRTlQU0k9\nIn0="                ';
              // const a =
              //   'eyJkYXRhIjoiSWxwWWJFdGhNV3haVlcxb1NtRnRPWEJWTVdRMFpERmtXRk5yV210U01taFBWbXBP\nYjFsV1duTlpNMmhwVFZVMU1GVnROVk5WUm1SR1UyeGtWVlp0VWxOVVZWcDNVbFpLZEdSR2FGTmhl\nbFkxVm1wSmVFMUdWWGROV0ZKb1VtdEtXRmxzYUVOVlFYQmFZV3RhZWxacVJtdGtWbEp6WTBVMVRt\nSlhhRE5XYTFwaFZtc3hWazFWWkZkaWJFcFFWbTF6TVZZeFZuUk5WazVUVFZaV05WcFZaREJXTVZw\nelkwUkNWMVl6YUZCV2JGcGhWakpPU1dOR1pFNVNiRmt3Vm0xd1IyUXhUa2hWYTJSVllsZDRWRU5z\nWkVaVGJUbFhZV3RhY2xSVlpFWmxWazVaWWtaU2FFMXRhRlZXYWtKclZUSk9WMVp1VWs1V2F6VlpW\nVzE0ZDJWR1draGtSVGxYVm10YVdsVlhlR0ZYYkZwR1YycE9WMkV4Y0doWk1WcExZekZ3U0dSR1pH\naGxiRmt5Vm1wS01HRXlTWGxTYkdOTFZUSjRjMVZ0Um5OVGJHaGFZVEpTVTFSVldtRldWa3B5WkVk\nd2FHVnJXbUZXYTJRMFlqSkdWMU5ZYkdoVFIyaFlWVzE0UzFSR2JIRlRhM0JzVW0xU01WWlhNVFJX\nUmtsNFUyeHdWMkpVUWpSVVZFRjRZekZrY21GRk5WZFNWWEJaVmtaV1UxSjNjRmROVjNRelZqSTFU\nMVl3TVZkaWVrcFhZbGhDVUZacVNrdFNNazVJWVVaa2FHRXhjRzlXYWtaclVqRkplRnBJVW1sU2JW\nSlVWbTAxUTFsV1duUmxSazVUVFZkNFdGWXhhSE5XVm1SSVlVWmtXbUpZVFhoWlZWcFhaRWRPTmxK\ndGJFNVNWRlkxUTJ4U1ZtRkhkRmRTTUhCSFZqSjRiMWRzV1hwVmJXaGFWbFp3Y2xacVJuZFNiR1Iw\nWlVaT2FXRXdjRXhXYkZKTFpXc3hWMWRZYUZoWFIyaFZXV3RrYjFkV1duUmxSWFJWVW0xNGVGVXlj\nelZWTURGWFkwWndXR0V4Y0hKV2FrWkxWakpPUjJGR1kwdFdibkJHVFVaa1YxcEdaR3BOYTNCSVZq\nSjRkMkpIU2tkalJtUllWak5TV0ZkV1dtdGpNVnB6WVVkNFUyVnRlRmxYVjNoWFpERmtjMkpHV21G\nU2VteGhWbTE0YzA1c2JGWmhTRTVhVm14d1dGa3dVazlXYlVwVlVteENWazFIVWxoVmFrWjNVbWR3\nVDFac1NsUldiR2hEVkZaYWRHTkZkRTVTYkd3MFdXdGFhMVpzWkVoaFJtUmFZbGhPTkZaRldtRmpW\nazVWVW14YVRsWnNjRWxXYTJRd1lqSktSMU51VW1oU2JIQllXVzAxUTFkR1duSlhiSEJyVFZkU01G\nVnRlRTlXTWtWNlVXcFdWMDF1VW5KRGF6RkhWbGhzVkdFeVVuRlZhMXBoVjBac1dHUklUazlTYlhj\neVZXMTRZV0pHU25SVmFrWlhZbGhvVEZsV1drcGxSazV6WTBaa2FWWkdXWHBXVnpGNlpVWkplVlJy\nV2xkaVJrcHZXbGN4TkZkV1drZFhiVVpyVFZkU2VsZHJhRXRaVmtwWVZXeGpTMVpHV2xka01WbDRZ\nVE5rYUZJelVsbFZiWGh6VG14YVdHVkhkRnBXYkhCWVZtMXdUMWxXV2xkalNFcGFaV3R3U0ZVd1pF\nOVRSMVpJWVVVMVdGSlZiRFZXYlhCSFlUQXhSMWRZYkZaaGF6VnhWVzB4YjJOR1ZuRlViVGxZVW14\nd2VsZHJVa05oUVhCT1ZtMTNNVlpVU2pCaE1rWllWbTVLYWxKdGFHRlphMlJ2Wkd4d1NHVkdjR3RO\nVjFJd1ZXMHhNRlV5U2tkalJGcFlWbXhhYUZsVVNrZFdNV1J5VjJ4b2FHVnJXbGxXYlhSWFdWZE9j\nMWRyVmxOaE0wSnpWVzE0ZDAxV1draE5WemxXVFd0Wk1rTnNXblZhUm1SWFVsVndXVlpZY0VkVU1V\nbDRXa2hXVm1KWVVsUlVWRVpMVlVaYVdHTkZUbGROUkZaWVZtMDFUMkZHU1hwVmJGcGFZVEZ3TTFS\nVldtRlhSMVpIVkd4b2FWSnRkekpYVmxaVFZERlplVkp1U2xoaWJrSm9WV3hrVTFkR1ZuUk5WazFM\nVlRCa1IxSXhVbk5hUm1SVFlrZDBOVlpXVWt0T1JtUjBWbXhvVjJFeWFGUlphMXBoWTBaV2MxVnNa\nRlJpUm5CNlYxUk9iMVV3TVZobFJtaFhUVmRvTTFac1dtdFRSMFpIWVVaV1YxWnVRWHBXYWtKaFky\nMVdXRlpyYUZOaVIxSllXVlJPUTA1bmNGZGlSMUV3VmtSR1UyTXhaSFZXYkVwb1RUQktXVmRYZEdG\na01rNXpWVzVLV0dGNlZuTldiWE14WlZac1ZsZHNUbWhTVkVaNlZUSTFiMVl4V1hwVmJHaGhVa1Zh\nY2xWcVNrdFNNVnB6Vkcxb1RrMVZjRlpXYkdONFRrZFJlRlJzWkdsU1JuQldRMjFLVldKR2FGWmlX\nRkl6V2xaYVUyTXhWbkphUm1ScFVtMDRlVlpYZUc5aE1WbDRWMnRhV0dKWGFHRlVWM0JIVlVaV2NW\nSnJkR3BOVjNReldrVmFhMkZGTVZkalJURlhZV3RLYUZacVFURmpNVkoxVTJzNVYwMHlhRlZYVjNS\ndlVUQTFjMXBHWjB0YVJXUXdZVEF4VjFacVZsWk5ibWh5Vm10a1MyUkhSa2RoUm5CcFVtdHdTRmRy\nVWtkWlYwNVhVbXhzWVZJemFGUlVWV2hEVTFaa1dHUkhkR3ROVmxZMFYydFdhMVpIU2tobFJtaFhZ\nbTVDUjFSVlduTk9iRVpWVW0xd1RsWnVRalpYVmxaclpIZHdhVkl3Y0VoWk1HUnZWakpLVlZKVVFt\nRlNSWEJZV1hwR2EyUldVblJoUms1c1lsaG9XbFp0TVhkUk1sRjRXa2hPYVZKc2NHOVZiR2hUVjBa\nU1dHUklaRlJTYlhRelZtMHdOVmRIUmpaU2FrWlhVbTFvZGxacVFYaFRSbFp5WVVaYWFXSldTWHBE\nYkdSWFYydDBhMUpzV25wWmExcGhZVlpLYzJORVdsZFNla1V3VjFaa1UxTkdVbkpYYlhSVFZrZDRW\nVmRYZUc5aU1XUnpWMnhXVTJKVWJIQlVWbHB6VGtaa2NsWnRPV2xTYTNCNlZqSXhSMVl5UlhoWGFr\nNWFUVzVvYUZWdGVHdGtSa3AwWTBkclMxVXdWa3RUTVZsNVpFZEdhRTFXU25wV01qVlhWVzFGZWxG\nc2FGZGlia0pEV2xWYVlWWldUbkprUms1T1ZsUldObFp0TVRSaE1rWlhVMWhvVkdKSFVsaFpiR2h2\nWTJ4YVZWTnNUbXBOVjFKNlZqSjRiMkZYUlhwUmJteFhVbXh3YUZwRVJtRmpkM0JYWW14S2MxVnNV\nbk5pTVZwMFpVaGtiR0pIZEROV2JYQkRWakF4VjJORVFsZFdiRXBFVld0a1MxSXhXbkZXYkZwT1lt\neEtNbFp0ZEd0U2JWWklWR3RzVTJKR2NIQlZiWFIzVG14YWNWSnRSbHBXTVVwSlZtMTBjMWxXU25S\nVmJGSmFZVEpvUkVOc1RuTmFSbXhxVWxSc2NGUldXbGROTVZKWFYyMTBXRkl3Y0RCYVZXUkhWakpL\nUjJOR1pHRldWbkJvV1RGYVMyUkhVa2RVYld4VFZrWlpNbFpzWTNoT1IwVjRWMWhrVGxOSGVHOVZh\nMVozVjFaYWNWUnJUbFZTYkhCWlZGWmFhMVpHU25OVGJtdExWbXBLTkdJeVJsZFRibFpTWW0xU1dG\nWnFUbTlXUmxweFVteHdiRkp0VWpGV1Z6RjNWVEZhVlZadWJGZFNiSEJvV1hwQk1WSXhaRmxpUlRs\nWFZrZDRXVmRYZUZkV01EQjRWVzVPV0dKVVZsVlVWbHAzVFVaU1YxVnJUbWhoZWtaR1ZtMTRiMWRu\nY0U1U2JrSnZWMVpXWVZNeVRuSk9WbVJvVW0xU2IxbFVRbmRYVmxwSVpFZEdXR0pXV2toV2JUVkxW\nbGRLU0dGSE9XRldNMUpvVlRKNFlXTXhjRVZSYXpsVFlraEJkMVpVU2pCaE1rWnpVMjVTYUZJd1ds\nWldibkJYVlVaU2NsZHNjR3ROV0VKSFEyMVNSMVJyTlZoU1ZYQktWbXBLTUZsV1VYaFhXR3hVWW10\nd1ZWbFljSE5YUm14ellVVk9WRkp0VWxoWGExWnJZVEZLYzFkc2NGaGhNVlV4Vm1wS1JtVnNSblZo\nUm1SWFRUQktVVlpXVWtkWlZrbDVVMnRzVm1KWVVsUldNRnBMVm14YVdFMVVVVXRaZWtFeFZqSk9S\nbGR0UmxOV01VcDJWbFphYjFFeFVYaGlSbFpWWVRBMVZWbHJXbmRXYkZWNVkwWk9hRkpVUmxoWk1G\nWnpWbTFLU0dGSVdsZE5SMUpNVlRCYVYyTXlSa2RqUjJ4VFlUTkNTbFl5ZEd0T1JteFlWRzVPWVZO\nRk5WbFpiR2h2VjBGd1ZWWnNjRE5WTUZwclkyeGFkRkp0YUU1aE1YQktWbTB3TVZReFpFaFRhMmhX\nWWtkb1dGbFVSbUZOYkZKV1YyNWtVMVpyY0hwV1J6RjNWR3hhVlZadFJsaFdNMUp5V1dwR1ZtVkdU\nblZVYlhCVFltdEtXbFp0TVRSVE1VNUhZMFZXVkdGNmJIRkRhekZZVlc1c1YySllhRkJaVldSWFpF\nZFdSMVpzYUZkaVYyZDZWbTF3UjJFeFNYbFRhMlJZWWtkU1dGVnRlSGRYVmxwSFYyMTBWazFWYkRO\nV1J6VlBWbGRLYzFkc2JGcGhNbEpVV1dwR2MxWldSblZhUjNoWFlraENObFpzWkRCTlJscDBVMnhq\nUzFZeWRHOVdNa3BWVm14b1YyRXlVa3hWTUZwWFpFVTVWMk5IYUU1V2JUazJWako0VjFsV2JGZGFS\nVnBPVm14YVUxbHJaRzlpTVhCWVpFZEdUMkpHY0hoVk1uQlRZVlV4Y2xkdWJGVldWMmg2V1ZWYVMw\nNXRTa2RhUm5CcFVqSm9NbFpHVWtkVmQzQlhZa2RTZWxVeU1UQlViVVY0WTBWd1dHRXhXbWhaVkVa\nVFl6RmtjMkpHU21sVFJVcFpWMWQwYTFSdFZrZGpSVlpUWWxWYVdWVnRjekZsVm1SeVYyMTBXRkpy\nYkRWWlZWcHZWMFpaZW1GR1VsWmhhMXB5VldwR1lWZFhSa2RoUjJoT1lYcFdUa05zV1hoaFNHUlRU\nV3hHTkZVeGFHOWhiRXBZVld4YVdtSkhVblpXUkVaVFZteGFkVnBHV21sU2JrSlpWbXhrTUUxR1VY\naFRXR1JPVmtaYVdGVnRNVzlrYkZsM1drVjBhbUY2VmxoWmExcDNWMFpPUmxOc2JGZGlXRkpvV1hw\nS1QyTXhaSFZXYlVWTFZXMTRTMk5HVm5GU2EzUllZa2RTZVZadE1UQmhNREZ5WTBWb1ZrMXFWbEJX\nVkVwSFl6Rk9jMXBHVmxkbGJGb3lWMnhrTkdNeFduTmFTRXBRVm14S1ZGbHJXblprTVZwWVRWUlNh\nMDFXYkRSVk1uaHJZV3hLVlZKc2FGcGlSMmhVV1ZWYWExWjNjRmhoTTBKelZXcEJNVkl4V1hsTlZF\nSldUV3R3V0ZVeU5XRlhSMHBJVlZoa1dGWnNjSEpWVnpGUFVqSkdSMXBHVGxkWFJVa3hWbXBHYTJR\neFRYaFRXR2hZVjBkb2FGVXdWbmRpTVZaeFZHMDVWMUpzV25wV1YzaHJWMFphZEZWc2FGZFdNMUp5\nUTIxRmQwMVlUbFJpYmtKaFZGVmFZVmRHV2xWVGEyUlBZbFZ3U2xWdGVIZFhSazVHVTJ0c1YxWkZi\nekJaVkVwUFl6RmtjMVpzWkdsU01taFZWMVpTVDFFeFpGZGFSbFpTWWxWYWNGUldXbk5PVmxaMFRs\nVjBWMUl3Y0hsWk1GcGhWMnhhUmxkcVRVdFdhMUpIWkRGYWMxcElVbE5pV0ZKWVdWUk9RMDVzV2xW\nVFdHaHFUV3RhV0ZaSGRHRldSMHBHVjJ4b1dtSkdTa1JVVkVaVFZqRmtjbGR0ZUZOaGVsWmhWMVpX\nYTFJeFdrZFRiR3hTWWtoQ1UxUlhjRWRVUmxsNFYyeGthMVpyV25wV01qRnZZVUZ3VGxORlNtRldi\nWFJyVGtac1dGVllhRmhpYXpWWVdXMTBkMkZHVm5STlZrNVlVbTE0ZVZsVlZrOVhSMHBJVld4b1Yy\nSlVSa2hXVjNONFYwWldjVkZzV21sU01tZzJWbTB3ZUZNeFRraFNhMlJvVW01Q2NGVnRkSGRUVmxw\neFVXMUdWMkpXUmpSRGJHUnpWbXhPYVZJeWFGVldSbFpUVW0xV2MxcElTbGRpVlZwdlZGZDBZVmRH\nVlhoaFJ6bFdUVmRTU1ZaWGVHOVdiVVp5VGxoYVdsWldjSHBXYkZwUFkyczVWMXBGTlZkaVJ6azBW\nbTEwYW1WR1NYaFdXR3hVWVRKU2NWVnRNVFJYVmxwMVkwVlpTMXBFUmxabFZURlhVMjE0VTJKV1Nt\nRlhWbEpEVFVac1YxTnNaR3BTYTBwWVZtdFdSMDVHV1hkWGJHUnFZbFZhU0ZkclZURldNREYwV2tS\nYVYySllhSEZhVlZwT1pWWlNXV0ZIUmxSU2EzQjJWbGN4TkdReVRrZFhXR1JoVW5wc2NGUldXbmRU\nVVhCVlZteEtWRmxVUVhoWFJsWnlZa1prYVZkR1NqWldha0pyVXpGa1dGSnJiRkppUm5Cd1ZtdGFZ\nVkpXV2toTlZGSm9UVlp3V0ZWdE5WTlZNa3BZWVVVNVYySllhR0ZhVjNoaFVqRmtkRTlXVms1V2JG\na3hWbGN3TVZReFdraFRhMmhvVW0xb1lVTnNXa1pYYldoVlZrVmFNMVpxUm10ak1WSjBZMFUxV0ZK\nVmNFbFdNblJYWVRBeFIxWlliRlJoTWxKeFZXdGFkMWRHYkZoa1NFNVBVbXhLVjFWdE5XdFdNa1ky\nVW01c1drMUdjRE5XTW5oaFYwWlNWVkpzWkdoaE1YQk5WMWh3UjFReVRuUlNhMk5MV1ZWYWEyRldU\na1pUVkVwWFlsUkdNMVY2UmxKbFJrNTFWR3hvYVdGNlZsaFhWM2hyVGtkSmVHTkdhR3hTTUZwWlZt\nMTRkMlZzWkhKaFIzUldZWHBHV1ZwVldtOVdNREZZWVVoYVdsWnNjRkJWYlhocll6RmtjMk5IYkZO\nTmJXaFdWbTF3UjFsUmNGZE5helZZVlcwMVYxbFdTbk5UYkdoYVlrZG9kbFl3V21GalZrNXhVV3hX\nVGxadGR6Qldha2t4VkRKR2MxTnVVbWhTYldoV1ZtMTRkMVJHVm5KWGJYUlhUVmRTZVZwRlpIZFVi\nVVkyVm10b1dGWnNXbkpWYWtaV1pWWktXV0ZIYkU1Tk1FcEdRMnhzY2xkdVpHeFNiRlkxV2tWU1Ex\nWXdNWEpqUld4WFZqTkNTRlpxUmtwbGJVWkpVMnh3VjJKSVFreFhiRlpoVXpGa1YyTkZaR0ZTYXpW\neldWUkdWMDB4V25STlNHUnNVbXhzTkZaSGRHdFdSMHB5WTBkb1ZtRnJTbWhXYTFwelYxZE9SMXBH\nWTB0V2JYaDNUVVp3UmxwRlpGaGlSbkI1Vkd4b2QxWXdNVmhoU0hCYVZrVmFURmt5Y3pGV01WWnpW\nbXhrYVZORlNuWldhMXBYV1Zac1dGVnJXazlXYkhCUlZtMHhVMVpHVWxaWGJtUlBWbXh3VmxVeWNG\nTmhhekZZVldwQ1ZtSkhhSFpaVjNoS1pWRndhRkp0YUZkWlZFWmhZVVphY2xkdFJtdFNNVnBLVjJ0\nYVQyRkhWbk5YYkhCWVlrWmFjbGt5ZUU1bFJscDFWV3M1VjFaVVZsRldiVEUwWkRKV2MxcElTbWhU\nUjFKV1ZGWmFkMlZzV25SalJUbFhWbXh3V1ZsVmFIZFhiRnBYWTBWNFdrMXFSbEJEYkVsNVVtdGtZ\nVkl5ZUZoVmJGcDJaVlphY2xkc1RsTk5WM2haVmtkNGExWlhTbkpqU0VaV1lXczFkbFpyV25OamJH\nUjFXa1p3VjJKSGR6RlhhMVpyVWpGWmQwMVdaR2xTUmtwWFZGYzFiMkZHYkZobFJUbFVVbXhhZWxs\ncldtdGhWbVJJV2pOdlMxWXlkR3RPUm14WFYyeGtWR0pyY0hKVmJURlRWREZhZEdWSVdteFNiSEJX\nVlRGb2IyRlZNVmRXYWxKWFRXNW9XRlpxU2t0a1JsWnpZVVprYVdKclNraFhhMUpIVjIxV1dGUllj\nR2hTTTBKeVZGUkNTMWRzWkZoTlZGSlVUVlphU0ZZeU5VOVpVWEJUWVhwV1dWWkdXbXRPUm1SellU\nTmtWMkpZVWxoVmJYaDNUVVp3U1dORmRGZE5WVzh5Vm0xNFExWXlSbkpqUldoVllsaG9URmw2U2t0\nU01YQkhXa1UxVGxKWVFsTldiWGhyVFVkRmVGUllhRlJYUjJoV1dXMTBZVlV4YkhKYVJrNXFVbXhz\nTTBOc2NFaFBWMnhPVm01Q05WWnNaREJoTVdSelYyNUthVkpHV2xoVmFrNVRZMnhzVjFkcmRHdFNi\nRm93VkRGYVYxWXlTa2xSV0hCWFlURndhRmRXWkU5ak1WcDFVMjFHVTAwd1NsQldiVEI0VFRBeFIx\nZHVSbFJXUlZwVlZGZDBWMDVHVlhoaFNHTkxWbGN4UzFJeFRuUlNiSEJwVWpKb1ZWWnJWbGRVTWsx\nNFkwVmtZVkl3V2xSWmJGcExWMVprV0dWR1pGcFdiSEI2VmxkNGIyRXhTWGRYYkd4V1lsaG9XRlJy\nV25OV2JIQkZVV3hrVjFaRldsaFhWRUpYWVRGWmQwMVlWbWhUUlhCWVdXdGFkMkZCY0ZWaVdHaG9X\nVEo0VjJSR1NuTmFSVFZPWWxkb2RsWnFTalJXTVd4WVVsaHNWVmRIYUhGVmJHUlRZVVpXZEUxV1Rs\naFNiRnA2VmpJMWExWkdTbk5pUkZKWVlURktSRlpxUVhoak1VcHhWV3h3YUUxWVFqSldiWEJMVXpK\nT2MxcElUbFZpUjFKdlEyc3hXVkZ0T1ZkaVdHaG9WMVprVTFkR1VuSmFSbFpvWld4YVVGWnRNVFJr\nTVU1WFYyeG9iRkpyTlhGVVZscGhWMFphYzJGSGRHaFNNVm93V2tWV05GWnJNVmhVV0dSaFVrVmFS\nRlpYZUVOV1ZURklZVEpzYlZWVU1Ea2kifQ==';

              const b = a.replace(/\n/g, '');
              const c = JSON.parse(Base64.decode(b));

              const newList = (c as any[])?.map((data) => {
                return {
                  name: data['ชื่อไฟล์'],
                  size: data['ขนาดไฟล์'],
                };
              });
              this.dataSourceZip.data = newList;
            } catch {
              this.dataSourceZip.data = [];
            }

            // const data = JSON.parse(
            //   Base64.decode(res.jsonField.replace(/\n/g, ''))
            // )?.data;
            // console.log(data);
            // console.log(Base64.decode(res.jsonField.replace(/\n/g, '')));
            // console.log(Base64.decode(data).replace(/\n/g, ''));
          } else {
            try {
              const data = JSON.parse(Base64.decode(res.jsonField));
              this.dataSource = new MatTableDataSource(data);
            } catch {
              this.dataSource.data = [];
            }
          }
          // btoa((JSON.parse(atob(a)) as any).data);
          // const a =
          //   'eyJkYXRhIjoiSW1WNVNtdFpXRkpvU1dwdmFWTlhlREJPTVdoRVZFZGtNVk5ZU201a1ZYaHRXak5X\nV21GdFpERlRlazV1WkZac1ZWb3pWa3RNTW1ReFV6Rm9ibVJXYkRSWk1HeHhZMGRPU21Kc1NuTmNi\nbGw2VGxKYU1IaFVVV3RTYVUwd1NURlRWVTV1Wld0MFZFNVlaR2xpVjFKcVUxZHNORmt3YkRGUmVs\nSnVaRlZOTUdKWFZrUk9TRTR4VVhwU2MxUXdUVEZoUlRsRVRrYzBjbEY2VW5kY2JscFZUVEZoYTFv\nellWVTVjMlF5YkU1bGEydDZWRzF3VW1WVmJFaFRhbFpyVWpGYU5sZEZUa3RQVlhoSlpFZE9TbVJW\nVFRCaFdGWkVUa2hSY2xGNlZuQlVNRTB3WTIxV1JFNVhhRkJjYmxGNlVuVkxNRTB3WTBkV1JFNVhj\nRWRrTW14UVlraGtjRnBGWkZkbGJWSkVVVmhTU2xKVk5USlpNR2h5WkZkT1NFNVhOVmxSTUd4NlYw\nVk9UVm96VmtwVVIyUXhVMjAxYm1SVmVFMWNibG96Vmt0V1IyUXhWMVpTYm1SVmIzWmFNMVpNVjBk\na01WZFlhR3BUVjNCM1dUQnNjVlJZYkU5bGJHdDNWRmRzUTJGWFZsbFZiWGhxVFZoa2NGcHNUalJP\nTVdoRVZFZGtNVk5ZU201Y2JtUlZlRzFhTTFaYVlXMWtNVk42VG01a1ZteFZXak5XUzB3eVpERlRN\nV2h1WkZac05Ga3diSEZqUjA1S1lteEtjMWw2VGxKa1YwNUlUbGMxV1ZFd2JIcFhSVTVOV2pOV1Ns\nUkhaREZjYmxOdE5XNWtWWGhOV2pOV1MxWkhaREZYVmxKdVpGVnZkbG96Vmt4WFIyUXhWMWhvYWxO\nWGNIZFpNR3h4VkZoc1QyVnNhM2RVVjJ4RFlWZFdXVlZ0ZUdwTldHUndXbXhaZDJGVFNqbGNiaUk9\nIn0=';

          // const b = a.replace(/\n/g, '');
          // const c = atob(b);
          // const i = JSON.parse(c).data;
          // const f = atob(i);
          // const g = f.slice(1, -1);
          // const h = g.replace(/\\n/g, '');
          // const j = atob(h);
          // const k = JSON.parse(j).data;
          // const l = Base64.decode(k);
          // const m = JSON.parse(l)
          // this.dataSource = new MatTableDataSource(this.apiParams);
        } else {
          this.dialog.open(DefaultDialogComponent, {
            maxHeight: '800px',
            width: '500px',
            data: {
              isError: true,
              status: 'ดำเนินการไม่สำเร็จ',
            },
          });
        }
      },
      error: () => {
        this.dialog.open(DefaultDialogComponent, {
          maxHeight: '800px',
          width: '500px',
          data: {
            isError: true,
            status: 'ดำเนินการไม่สำเร็จ',
          },
        });
      },
    });
  }
  get getLink() {
    return this.apiDetail?.apiLink
      ? this.sanitizer.bypassSecurityTrustResourceUrl(
          this.apiDetail.apiLink ?? ''
        )
      : '';
  }
  onShowExampleData() {
    const body = {
      userId: this.userService.getUser()?.userId,
      apiId: this.apiDetail?.apiId,
      countdatetemp: '365',
      countdate: '365',
      zone: this.apiDetail?.zone,
    };
    let token = '';
    this.mainApiService.getTokenPublic(body).subscribe((res) => {
      if (res.returnCode === '01') {
        token = res.tokenKey;
        this.dialog.open(DataServiceDialogComponent, {
          width: '500px',
          data: {
            tokenKey: token,
          },
        });
      }
      if (res.returnCode === '00') {
        this.dialog.closeAll();
        this.dialog.open(DefaultDialogComponent, {
          maxHeight: '800px',
          width: '500px',
          data: {
            status: 'รอให้เจ้าของข้อมูลอนุมัติ',
          },
        });
      }
      if (res.returnCode === '98') {
        this.dialog.closeAll();
        this.dialog.open(DefaultDialogComponent, {
          maxHeight: '800px',
          width: '500px',
          data: {
            isError: true,
            status: 'มีข้อมูลที่ร้องขอแล้ว',
          },
        });
      }
    });

    // this.router.navigate(['data-service-request']);
  }
  onRequestData() {
    const body = {
      userId: this.userService.getUser()?.userId,
      apiId: this.apiDetail?.apiId,
      countdatetemp: '365',
      countdate: '365',
      zone: this.apiDetail?.zone,
    };
    let token = '';
    this.mainApiService.getTokenPublic(body).subscribe({
      next: (res) => {
        if (res.returnCode === '01') {
          token = res.tokenKey;
          if (this.apiDetail) {
            this.apiDetail.tokenKey = res.tokenKey;
          }
          this.dialog.open(DataServiceDialogComponent, {
            width: '500px',
            data: {
              tokenKey: token,
            },
          });
        }
        if (res.returnCode === '00') {
          this.dialog.closeAll();
          this.dialog.open(DefaultDialogComponent, {
            maxHeight: '800px',
            width: '500px',
            data: {
              status: 'รอให้เจ้าของข้อมูลอนุมัติ',
            },
          });
        }
        if (res.returnCode === '98') {
          this.dialog.closeAll();
          this.dialog.open(DefaultDialogComponent, {
            maxHeight: '800px',
            width: '500px',
            data: {
              isError: true,
              status: 'มีข้อมูลที่ร้องขอแล้ว',
            },
          });
        }
      },
      error: () => {
        this.dialog.closeAll();
        this.dialog.open(DefaultDialogComponent, {
          maxHeight: '800px',
          width: '500px',
          data: {
            isError: true,
            status: 'ดำเนินการไม่สำเร็จ',
          },
        });
      },
    });
  }
  back() {
    window.history.back();
  }
  copy() {
    navigator.clipboard.writeText(this.apiDetail?.apiLink ?? '');
  }
  onClickFile(fileType: string) {
    if (!this.apiList.some((a) => a === fileType) && this.apiDetail?.tokenKey) {
      window.open(this.mainUrl + this.apiDetail.tokenKey, '_blank');
      // this.mainApiService.getFile(this.apiDetail.tokenKey).subscribe();
    }
  }
  isShowDownload() {
    return (
      !this.apiList.some((a) => a === this.apiDetail?.tType) &&
      this.apiDetail?.tokenKey
    );
  }
}
