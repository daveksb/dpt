import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@dpt/feature/login';
import { PdpaComponent } from '@dpt/ui';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pdpa', component: PdpaComponent },

  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
