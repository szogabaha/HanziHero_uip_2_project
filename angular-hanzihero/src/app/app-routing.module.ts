import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SessionComponent } from './session/session.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: '', redirectTo: "login", pathMatch: "full"},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'passwordreset', component: ForgotpasswordComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'session', component: SessionComponent},
  { path: 'settings', component: SettingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
