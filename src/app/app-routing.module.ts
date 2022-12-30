import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { AddAdComponent } from './add-ad/add-ad.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profiles/:nickname', component: ProfilesComponent},
  { path: 'addAd', component: AddAdComponent},
  { path: 'ad/:id', component: AdDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
