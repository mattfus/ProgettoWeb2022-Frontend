import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServerService } from '../server.service';
import { AppComponent } from '../app.component';
import { AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  public sessionId = "";
  constructor(private app: AppComponent) {
    this.sessionId = this.app.getSessionId();
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    this.sessionId = this.app.getSessionId();
  }


}
