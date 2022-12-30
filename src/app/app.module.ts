import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { AddAdComponent } from './add-ad/add-ad.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { AdCardsComponent } from './ad-cards/ad-cards.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfilesComponent,
    AddAdComponent,
    AdDetailsComponent,
    AdCardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
