import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ad } from './classes';
import { User } from './classes';
import { Property } from './classes';
import { Review } from './classes';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  checkLoggedIn(sessionId: string): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/checkLoggedIn', {params: {sessionId: sessionId}});

  }

  getUserBySession(sessionId: string | null): Observable<User> {
    if(sessionId == null)
      return new Observable<User>();
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

  addAd(sessionId: string, title: string, description: string, type: string, media: Blob[] | null | undefined, mq: string, latitude: string, longitude: string, price: string): Observable<string> {

      return this.http.post<string>('http://localhost:8080/addAd', media, {params: {sessionId: sessionId, title: title, description: description, type: type, mq: mq, latitude: latitude, longitude: longitude, price: price}});

    /*
    var ad : Observable<string> = this.http.get<string>("http://localhost:8080" + "/addAd?" + "sessionId=" + sessionId + "&title=" + title + "&description=" + description + "&type=" + type + "&mq=" + mq + "&latitude=" + latitude + "&longitude=" + longitude);
    */
  }

  getImage(adId: number): Observable<Blob[]> {
    return this.http.get<Blob[]>('http://localhost:8080/getImage', {params: {adId: adId}, responseType: 'json'});
  }

  getAd(adId: string): Observable<Ad> {
    return this.http.get<Ad>('http://localhost:8080/ad?adId=' + adId);
  }

  sendEmail(title: string, adId: number, text: string, email: string): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/sendEmail', {params: {title: title, adId: adId, text: text, email: email}});
  }

  addReview(title: string, description: string, rating: number, user: string, ad: number): Observable<boolean>{
    console.log(user);
    return this.http.get<boolean>('http://localhost:8080/newReview?title=' + title + '&description=' + description + '&rating=' + rating + '&user=' + user + '&ad=' + ad);
  }

  getReviews(adId: number): Observable<Review[]>{
    return this.http.get<Review[]>('http://localhost:8080/getReviews', {params: {adId: adId}});
  }

  removeReview(reviewId: number): Observable<boolean>{
    return this.http.get<boolean>('http://localhost:8080/removeReview?reviewId=' + reviewId);
  }

}
