import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  DataServiceDetailComponent,
  DataServiceListComponent,
  DataServiceRequestComponent,
  ForgotPasswordComponent,
  LoginComponent,
  RegisterComponent,
} from '@dpt/feature/login';
import { PdpaComponent } from '@dpt/ui';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pdpa', component: PdpaComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'data-service-list', component: DataServiceListComponent },
  { path: 'data-service-detail', component: DataServiceDetailComponent },
  { path: 'data-service-request', component: DataServiceRequestComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
