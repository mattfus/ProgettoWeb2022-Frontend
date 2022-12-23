import { Component, Input, OnInit } from '@angular/core';
import { Ad } from '../classes';
import { User } from '../classes';
import { Property } from '../classes';
import { ServerService } from '../server.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Array di annunci
  public ads: Ad[] = [];

  constructor(private service: ServerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Ci serve il service che prenda tutti gli annunci dal database
    //someService.getAds().subscribe(ads => this.ads = ads);
    this.service.getAds().subscribe(ads => this.ads = ads);
  }



}
