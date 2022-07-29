import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from '@dpt/feature/login';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LoginComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
