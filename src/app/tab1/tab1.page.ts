import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { FcmServiceService } from '../services/fcm-service.service';
import { DataService } from '../services/data.service';
import { AppRate, AppRateReviewTypeAndroid, AppRateReviewTypeIos } from '@awesome-cordova-plugins/app-rate/ngx';

import * as moment from 'moment';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  userId:any;

  stocks:any[] = [];
  isLoading: boolean = true;
  nifty50Price = {
    SYMBOL: "NIFTY 50",
    LTP: 19378.2,
    CHNG: -119.1,
    PcCHNG: -0.61,
    sign: -1
};

subscriptionEndDate:any;
isBlocked:boolean = false;


  getSocketInteval:any;
  blockedInterval:any;
  getAllStocksSub!:Subscription;
  getNifty50PriceSub!:Subscription;
  getUserProfileSub!:Subscription;
  constructor(private router: Router,
    private data: DataService,
    private appRate: AppRate,
            private socket: Socket,
    private http: HttpClient) {
      this.socket.connect();
      this.socket.on('connect',() =>{
        console.log("Connected");
        
      })

      this.socket.on('get:Stocks',(value:any) =>{
        console.log("data received");
        // console.log(value);
        this.stocks = [];

        for (let index = 0; index < value.length; index++) {
          const element = value[index];
          // console.log(element);
          
          this.stocks.push(element);
        }

        // console.log(this.stocks);
        
        
      })

      
      this.socket.on('get:Nifty50',(value:any) =>{
        console.log(`Nifty Price`);
        // console.log(value);
        this.nifty50Price = value[0];
        
      })
    }
   


    async ngOnInit() {
      this.userId = await this.data.get("userId");
     
      // this.showRatingPrompt();
     this.blockedInterval = setInterval(() =>{
        this.getUserProfile();
      },2000)
     }

     getUserProfile(){
     this.getUserProfileSub =   this.http.get(environment.API +`App/api/v1/get/user/${this.userId}`)
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
    // ionViewDidEnter(){
    //   // this.fcm.initPush();
    // this.getSocketInteval =   setInterval(() =>{
    //     this.getAllStocks();
    //     this.getNifty50Price();
    //   },1000);
    // }


    CheckForDate(date:any){
      let endDate = date;
      let todaysDate = moment().format("DD-MM-YYYY");

      console.log("DAte is"+ endDate + " == "+ todaysDate);
      console.log(moment(todaysDate).isSame(endDate));
      
      
      if(this.isBlocked == true){
        clearInterval(this.blockedInterval);
        console.log("Subscription Ended Please Recharge");
        this.router.navigate(['blocked-page'], {
          skipLocationChange: true,
          replaceUrl:true
        });
        return;
        
      }
    }
    ionViewDidLeave(){
      clearInterval(this.getSocketInteval);
      clearInterval(this.blockedInterval);
      this.getAllStocksSub.unsubscribe();
      this.getUserProfileSub.unsubscribe();
      this.getUserProfileSub.unsubscribe();
    }

    getNifty50Price(){
    this.getNifty50PriceSub =   this.http.get(environment.API +'App/api/live/index')
      .subscribe({
        next:(data:any) =>{
          console.log(data);
          
        },
        error:(error) =>{
          console.log(error);
          
        }
      })
    }
    getAllStocks(){
     this.getAllStocksSub =  this.http.get(environment.API +'App/api/live/GetStocks')
      .subscribe({
        next:(value:any) =>{
          console.log(value);
          // for (let index = 0; index < value.length; index++) {
          //   const element = value[index];
          //   this.stocks.push(element);
          // }
          // this.isLoading = true;
          
        },
        error:(error) =>{
          console.log(error);
          // this.isLoading = false;
          
          
        }
      })
    }
  viewNotifications(){
      this.router.navigate(['notification'])
  }
}
