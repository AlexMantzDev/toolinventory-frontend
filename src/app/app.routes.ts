import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPassComponent } from './auth/forgot-pass/forgot-pass.component';
import { ChangePassComponent } from './auth/change-pass/change-pass.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-pass', component: ForgotPassComponent },
  { path: 'reset-pass', component: ChangePassComponent },
  { path: 'verify', component: VerifyComponent },
  { path: '**', component: PageNotFoundComponent },
];
