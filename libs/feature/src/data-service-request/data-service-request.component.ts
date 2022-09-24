import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainApiService } from '@dpt/shared';
import { Category } from 'libs/shared/src/lib/share.model';

@Component({
  selector: 'dpt-data-service-request',
  templateUrl: './data-service-request.component.html',
  styleUrls: ['./data-service-request.component.scss'],
})
export class DataServiceRequestComponent implements OnInit {
  formGroup = new FormGroup({
    departmentId: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required),
    requestDetail: new FormControl(null, Validators.required),
    requestName: new FormControl(null, Validators.required),
    rfdata: new FormControl<File | null>(null, Validators.required),
  });
  category: Category[] = [];
  constructor(private apiService: MainApiService) {}
  get rfdata() {
    return this.formGroup.get('rfdata')?.getRawValue() as File;
  }
  ngOnInit(): void {
    this.apiService.getCategory().subscribe((a) => {
      this.category = a.Category;
    });
  }
  onConfirm() {
    const email = this.formGroup.get('email')?.value;
    if (this.formGroup.valid && email) {
      this.apiService.forgotPassword(email).subscribe((res) => {
        //
      });
    }
  }
}
