import { Component, Input, OnInit } from '@angular/core';
import { Ad } from '../classes';
import { User } from '../classes';
import { Property } from '../classes';
import { ServerService } from '../server.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Array di annunci
  public ads: Ad[] = [];
  public sessionId = "";

  constructor(private service: ServerService, private app: AppComponent) { }

  ngOnInit(): void {
    //Ci serve il service che prenda tutti gli annunci dal database
    //someService.getAds().subscribe(ads => this.ads = ads);
    this.service.getAds().subscribe(ads => this.ads = ads);
  }

   public getSessionId():string{
    return this.app.getSessionId();
  }


}
