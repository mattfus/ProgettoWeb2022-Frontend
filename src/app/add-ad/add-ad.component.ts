import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { Observable, catchError, map, of } from 'rxjs';
import { ServerService } from '../server.service';



@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.css']
})
export class AddAdComponent implements OnInit {

  apiLoaded: Observable<boolean> | undefined;

  constructor(private app: AppComponent, private httpClient: HttpClient, private service: ServerService) {
      this.apiLoaded = httpClient.jsonp("https://maps.googleapis.com/maps/api/js?key=AIzaSyCugDwETlCONJNbxQRQ7Qv5OwsD6bv98yY", "callback")
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
   }

   lat: string = "";
   lng: string = "";
   result:string = "";
   sessionId: string = "";

   center: google.maps.LatLngLiteral = {lat: 41.97707664579145, lng: 12.439453124999996};
   zoom = 5;
   markerOptions: google.maps.MarkerOptions = {draggable: false};
   markerPositions: google.maps.LatLngLiteral[] = [];

   addMarker(event: google.maps.MapMouseEvent) {
    if(event.latLng != null){
      this.markerPositions = [];
      this.markerPositions.push(event.latLng.toJSON());
      this.lat = event.latLng.toJSON().lat.toString();
      this.lng = event.latLng.toJSON().lng.toString();
      console.log(this.lat);
      console.log(this.lng);
    }
   }

  ngOnInit(): void {
  }

  public getSessionId():string{
    return this.app.getSessionId();
  }

  public async addAd(): Promise<void>{
    this.sessionId = this.app.getSessionId();
    console.log("sessionID: " + this.sessionId);
    if(this.sessionId == null || this.sessionId == ""){
      window.location.href = "http://localhost:8080/login";
      alert("Effettua il login per poter pubblicare un annuncio");
      return;
    }

    let status = (<HTMLInputElement>document.getElementById("statusInput")).value;
    let title = (<HTMLInputElement>document.getElementById("titleInput")).value;
    let description = (<HTMLInputElement>document.getElementById("text-areaInput")).value;
    let type = (<HTMLInputElement>document.getElementById("typeInput")).value;
    let photos = (<HTMLInputElement>document.getElementById("mediaInput")).files;
    let mq = (<HTMLInputElement>document.getElementById("mqInput")).value;
    let price = (<HTMLInputElement>document.getElementById("priceInput")).value;
    let latitude = this.lat;
    let longitude = this.lng;

    let media: Blob[] = [];

    let formData = new FormData();

    if(photos != null)
      formData.append("photos", photos[0], photos[0].name);
      let response = await fetch('http://localhost:8080/upload',
       {
         method: 'POST',
         body: formData
       }
      );
      if(response.status == 200){
        alert('Upload effettuato con successo');
      }

      //this.service.sendBlobs(byteArray);
      /*
      this.service.addAd(this.getSessionId(), status, title, description, type, mq, latitude, longitude, price).subscribe(result => this.result = result).add(() => {
        if(this.result == "true" || this.result === "true" ){
          alert("Annuncio pubblicato con successo");
        }
        else{
          alert("Errore nell'aggiunta dell'annuncio");
        }
      });
      */
  }
}
