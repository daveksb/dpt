import { Injectable } from '@angular/core';

import { Department } from './share.model';

@Injectable({
  providedIn: 'root',
})
export class SharedStateService {
  departments?: Department[] = [];

  get getDepartment() {
    return JSON.parse(JSON.stringify(this.departments)) as Department[];
  }
  setDepartment(data: Department[]) {
    this.departments = data;
  }
}
