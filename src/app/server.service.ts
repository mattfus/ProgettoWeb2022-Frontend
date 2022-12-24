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

  getUserBySession(sessionId: string): Observable<User> {
    return this.http.get<User>('http://localhost:8080/user', {params: {parameter: sessionId, bySession: "true"}});
  }

  getUserByNickname(nickname: string): Observable<User> {
    return this.http.get<User>('http://localhost:8080/user', {params: {parameter: nickname, bySession: "false"}});
  }

  getAds(): Observable<Ad[]>{
    return this.http.get<Ad[]>('http://localhost:8080/ads');
  }

}
