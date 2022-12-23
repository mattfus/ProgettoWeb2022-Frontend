import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';
import { waitForAsync } from '@angular/core/testing';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedIn: boolean = false;
  sessionId:string = "";
  nickname:string = "";

  constructor(private server : ServerService, private location: Location){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('sessionId');
    if(id != null && id != ""){
      this.server.checkLoggedIn(id).subscribe(loggedIn => this.loggedIn = loggedIn).add( () => {
        if(this.loggedIn && id != null && id != ""){
          this.server.getNickname(id).subscribe(nickname => this.nickname = nickname);
          this.sessionId = id;
        }
      });

    }

  }

  title = 'CasaSubito.it';

  public getLoggedIn(): boolean {
    return this.loggedIn;
  }

  public getSessionId(): string{
    return this.sessionId;
  }

  public getNickname(): string{
    return this.nickname;
  }

  buttonsNav: any;
}


