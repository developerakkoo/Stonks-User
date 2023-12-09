import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HapticService } from '../services/haptics.service';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userId:any;

  subscriptionEndDate:any;
isBlocked:boolean = false;


  getSocketInteval:any;
  blockedInterval:any;

  getUserProfileSub!:Subscription;
  constructor(private router: Router,
              private data: DataService,
              private http: HttpClient,
              private haptics: HapticService) {}


  goToPage(name: string){
    this.haptics.hapticsImpactLight();
    this.router.navigate([name]);
  }

  async ngOnInit() {
    this.userId = await this.data.get("userId");
   
    // this.showRatingPrompt();
   this.blockedInterval = setInterval(() =>{
      this.getUserProfile();
    },2000)
   }


  async onLogout(){
    this.data.remove("isLoggedIn");
    this.router.navigate(['']);
  }


  getUserProfile(){
    this.getUserProfileSub = this.http.get(environment.API +`App/api/v1/get/user/${this.userId}`)
      .subscribe({
        next:(value:any) =>{
          console.log(value);
         
          this.subscriptionEndDate = value['user']['SubscriptionEndDate'];
          this.isBlocked = value['user']['isBlocked'];
          
          
          this.CheckForDate(this.subscriptionEndDate);
        },
        error:(error) =>{
          console.log(error);
          
        }
      })
    }

    CheckForDate(date:any){
      let endDate = date;
      let todaysDate = moment().format("DD-MM-YYYY");

      console.log("DAte is"+ endDate + " == "+ todaysDate);
      console.log(moment(todaysDate).isSame(endDate));
      
      
      if(this.isBlocked == true){
        clearInterval(this.blockedInterval);
        console.log("Subscription Ended Please Recharge");
        return;
        
      }
    }
}
