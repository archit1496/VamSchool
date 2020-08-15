import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';

import { ContactusComponent } from './contactus/contactus.component';
import { HelpComponent } from './help/help.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'help', component: HelpComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'wrapper', loadChildren: () => import('./shared-modules/shared.module').then(m => m.SharedModule)},

  // Wildcard Route
  { path: '**', component: LoginComponent },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
