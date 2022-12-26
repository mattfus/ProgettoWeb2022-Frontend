import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.css']
})
export class AddAdComponent implements OnInit {

  constructor(private app: AppComponent) { }

  lat = 51.678418;
  lng = 7.809007;

  ngOnInit(): void {

  }

  public getSessionId():string{
    return this.app.getSessionId();
  }
}
