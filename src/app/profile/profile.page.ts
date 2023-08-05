import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userId!:string;
  name!:string;
  email!:string;
  photo!:string;

  subname!:string;
  subDesc!:string;
  subPrice!:string;
  subDuration!:string;
  subDate!:string;
  subEndDate!:string;

  isFreePlan!:boolean;



  constructor(private data: DataService,
              private router: Router,
              private http: HttpClient) { }

  async ngOnInit() {
   this.userId = await this.data.get("userId");
   this.getUserProfile();
  }

  goToSubcriptionPage(){
    this.router.navigate(['subscription']);
  }
  getUserProfile(){
    this.http.get(environment.API +`App/api/v1/get/user/${this.userId}`)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.email = value['user']['email'];
        this.name = value['user']['name'];
        this.photo = value['user']['photo'];

        if(value['user']['Subscription'] == "freePlan"){
          console.log("Freee Plan Active");
          this.isFreePlan = true;
          this.subEndDate = value['user']['SubscriptionEndDate']

          
        }if(value['user']['Subscription'] == "paidPlan") {
          this.isFreePlan = false;

          this.subDate = value['user']['SubscriptionId']['createdAt'];
          this.subDesc = value['user']['SubscriptionId']['description'];
          this.subDuration = value['user']['SubscriptionId']['duration'];
          this.subname = value['user']['SubscriptionId']['name'];
          this.subPrice = value['user']['SubscriptionId']['price'];
          this.subEndDate = value['user']['SubscriptionEndDate']
          console.log(this.subPrice);
        }

        
        
        
        
      },
      error:(error) =>{
        console.log(error);
        
      }
    })
  }

}
