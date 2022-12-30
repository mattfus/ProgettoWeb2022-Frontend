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

  searchAds(searchType: string, parameter: string): Observable<Ad[]>{
    return this.http.get<Ad[]>('http://localhost:8080/searchAds', {params: {searchType: searchType, parameter: parameter}});
  }

  addAd(sessionId: string, title: string, description: string, type: string, media: File | null | undefined, mq: string, latitude: string, longitude: string, price: string): Observable<string> {

      return this.http.post<string>('http://localhost:8080/addAd', media, {params: {sessionId: sessionId, title: title, description: description, type: type, mq: mq, latitude: latitude, longitude: longitude, price: price}});

    /*
    var ad : Observable<string> = this.http.get<string>("http://localhost:8080" + "/addAd?" + "sessionId=" + sessionId + "&title=" + title + "&description=" + description + "&type=" + type + "&mq=" + mq + "&latitude=" + latitude + "&longitude=" + longitude);
    */
  }

}
