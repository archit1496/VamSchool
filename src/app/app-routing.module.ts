import { StudentAssignementsComponent } from './student-assignements/student-assignements.component';
import { StudentTimetableComponent } from './student-timetable/student-timetable.component';
import { StudentHomeDashboardComponent } from './student-home-dashboard/student-home-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';

import { ContactusComponent } from './contactus/contactus.component';
import { HelpComponent } from './help/help.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'help', component: HelpComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'home-header', component: HomeHeaderComponent },
  { path: 'password-change', component: PasswordChangeComponent },
  {path:'forgot-password',component:ForgotPasswordComponent},




  { path: 'wrapper', loadChildren: () => import('./shared-modules/shared.module').then(m => m.SharedModule)},

  // Wildcard Route
  { path: '**', component: HomeComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
