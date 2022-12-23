import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ad } from './classes';
import { User } from './classes';
import { Property } from './classes';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  checkLoggedIn(sessionId: string): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/checkLoggedIn', {params: {sessionId: sessionId}});

  }

  getNickname(sessionId: string): Observable<string> {
    return this.http.get<string>('http://localhost:8080/nickname', {params: {sessionId: sessionId}});
  }

  getAds(): Observable<Ad[]>{
    return this.http.get<Ad[]>('http://localhost:8080/ads');
  }
}
