import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Ad } from '../classes';
import { User } from '../classes';
import { Property } from '../classes';
import { ServerService } from '../server.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-ad-cards',
  templateUrl: './ad-cards.component.html',
  styleUrls: ['./ad-cards.component.css']
})

export class AdCardsComponent implements OnChanges {

  @Input() ads: Ad[] = [] //Array di annunci
  @Input() filter: string = ""; //Filtro di annunci

  constructor(private app: AppComponent){

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges: " + changes);
  }

  public ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  public getSessionId():string{
    return this.app.getSessionId();
  }

  public isEmpty():boolean{
    return this.ads.length == 0;
  }

  public canShow(status: string):boolean{
    if(this.filter == "all"){
      return true;
    }else if(this.filter == "rent" && status == "affittasi"){
      return true;
    }else if(this.filter == "sell" && status == "vendesi"){
      return true;
    }else{
      return false;
    }
  }
}
