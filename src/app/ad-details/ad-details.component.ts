import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from '../classes';
import { User } from '../classes';
import { ServerService } from '../server.service';
import { AppComponent } from '../app.component';
import { Renderer2 } from '@angular/core';
import { retry } from 'rxjs';


@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent {

  public ad: Ad = new Ad();
  public id: string = "";
  public owner: User = new User();
  public user: User = new User();
  public sessionId: string | null = "";
  public blobs: Blob[] = [];

  public adId:number = 0;
  public display:Boolean=false;
  public displayRece:Boolean=false;
  public changed: boolean = false;

  constructor(private service: ServerService, private app: AppComponent, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const url = new URL(window.location.href);
    this.id = url.pathname.split("/")[2];
    let session: string | null;
    session = url.searchParams.get("sessionId");
    this.service.getAd(this.id).subscribe((ad: Ad) => {
      this.ad = ad;
      this.owner = ad.user;
      this.adId = ad.id;
      this.sessionId = session;
      this.service.getImage(this.ad.id).subscribe(blobList => {
        this.ad.images = blobList;
        this.blobs = blobList;
        let carosello = document.getElementById("carosello") as HTMLDivElement;
        console.log(carosello);
        for(let i = 0 ; i < this.blobs.length; i++){
          let div = this.renderer.createElement("div") as HTMLDivElement;
          let img = this.renderer.createElement("img") as HTMLImageElement;
          div.className = "carousel-item";
          img.className = "d-block w-100 img-fluid";
          img.style.height = "400px";
          if(i == 0){
            div.className += " active";
          }
          img.src = 'data:image/jpeg;base64,' + this.blobs[i];
          div.appendChild(img);
          carosello.appendChild(div);
          console.log(div);
          console.log(img);
        }
      }).add(() =>{
        this.service.getUserBySession(session).subscribe(user => this.user = user);
      });
    }).add(() => {
      console.log(this.ad.images.at(0));
    });
}


  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
  }

  public getSessionId(): string {
    return this.app.getSessionId();
  }

  async sendEmail(): Promise<void>{
    const title=this.ad.title
    const adId=this.ad.id
    const text = this.renderer.selectRootElement('#mex');
    //TODO
    //Inserire nel form o chiamare oggetto ?
    //const emailUtente

    if(text.value){
      let result: boolean;
      this.service.sendEmail(title,adId,text.value, this.user.email).subscribe(a=> result = a).add(() => {
        if(result){
          alert("La Consegna del messaggio e' andata a buon fine il venditore ti rispondera' nel tempo' piu' breve possibile, tipicamente in 48h");
          this.onContact();
        }else{
          alert("Qualcosa e' andato storto, riprova tra qualche minuto");
        }
      });
    }
    else
      alert("Non puoi inviare una email vuota");

  }

  public addReview():void{
    const elem = document.getElementById('recens');
    const scriviUnaRec =document.getElementById("scriviUnaRece")

    if(!this.displayRece){
      elem?.classList.remove("nodisplay")
      elem?.classList.add("display")
      scriviUnaRec?.classList.add("nodisplay")
      this.displayRece=true;
    }
    else{
      elem?.classList.add("nodisplay")
      scriviUnaRec?.classList.remove("nodisplay")
      this.displayRece=false
    }
  }

  onContact(): void {
    const b=document.getElementById("contatta")
    const form= document.getElementById("display")
    const tel=document.getElementById("tel")
    if(!this.display){
      form?.classList.remove("nodisplay")
      form?.classList.add("display")
      b?.classList.add("nodisplay")
      tel?.classList.add("nodisplay")
      this.display=true;
    }
    else{
      form?.classList.add("nodisplay")
      b?.classList.remove("nodisplay")
      tel?.classList.remove("nodisplay")
      this.display=false
    }
  }

  sendReview():void{
    let canSend:Boolean=true

    const title=this.renderer.selectRootElement('#titleInput')
    let vote:any;
    vote=document.getElementById('rating')
    const description=this.renderer.selectRootElement('#description');
    if(!title.value || !description.value){
      canSend=false;
    }
    if(canSend){
      this.service.addReview(title.value,description.value,vote.value,this.user.nickname,this.ad.id).subscribe(result =>{
        if(result){
          alert("Recensione inserita con successo");
          this.changed=true;
        }
        else{
          alert("Qualcosa e' andato storto, riprova tra qualche minuto");
        }
      });
    }
  }

  isUserLogged(): boolean{
    return this.app.getLoggedIn();
  }
}
