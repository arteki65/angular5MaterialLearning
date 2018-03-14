import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthGurad} from './auth/auth.gurad';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGurad]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGurad]
})
export class AppRoutingModule {
}
