import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme: BehaviorSubject<string> = new BehaviorSubject('primary');
  selectedTheme$ = this.theme.asObservable();

  setTheme(theme: string) {
    this.theme.next(theme);
  }
}
