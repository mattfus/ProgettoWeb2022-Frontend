import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Array di annunci
  //ads: Ad[] = [];

  constructor(/*someService*/) { }

  ngOnInit(): void {
    //Ci serve il service che prenda tutti gli annunci dal database
    //someService.getAds().subscribe(ads => this.ads = ads);
  }



}
