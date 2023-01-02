import { Component, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Ad } from '../classes';
import { User } from '../classes';
import { Review } from '../classes';
import { ServerService } from '../server.service';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  @Input() adId: number = 0;
  @Input() changed: boolean = true;
  @Input() user: User = new User();
  @Input() owner: User = new User();
  public reviews: Review[] = [];
  public average: number = 0;

  constructor(private service: ServerService) { }

  ngOnInit(): void {
    console.log(this.adId);
    this.service.getReviews(this.adId).subscribe(reviews => this.reviews = reviews);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if(this.changed){
      this.service.getReviews(this.adId).subscribe(reviews => this.reviews = reviews);
    }
  }

  getAverage(): number{
    return this.average;
  }

  deleteReview(reviewId: number): void{
    this.service.removeReview(reviewId).subscribe(result => {
      if(result){
        this.service.getReviews(this.adId).subscribe(reviews => this.reviews = reviews);
      }
    })
  }
}