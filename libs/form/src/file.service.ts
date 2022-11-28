import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';

export interface Batch {
  refId: string;
  intervalRef: Observable<number>;
}
@Injectable({
  providedIn: 'root',
})
export class FileService {
  batchList: Batch[] = [];
  constructor() {}
  startInterval(refId: string, interval: Observable<number>) {
    this.batchList.push({
      intervalRef: interval,
      refId: refId,
    });
  }
  removeInterval(refId: string) {
    const temp = this.batchList.findIndex((b) => b.refId === refId);
    this.batchList.splice(temp, 1);
  }
}
