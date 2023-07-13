import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { FcmServiceService } from '../services/fcm-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  stocks:any[] = [];
  isLoading: boolean = false;
  nifty50Price = {
    SYMBOL: "NIFTY 50",
    LTP: 19378.2,
    CHNG: -119.1,
    PcCHNG: -0.61,
    sign: -1
};

  getSocketInteval:any;
  constructor(private router: Router,
            private socket: Socket,
            private fcm: FcmServiceService,
    private http: HttpClient) {
      this.socket.connect();
      this.socket.on('get:Stocks',(value:any) =>{
        console.log("socket");
        console.log(value);
        this.stocks = [];

        for (let index = 0; index < value.length; index++) {
          const element = value[index];
          this.stocks.push(element);
        }
        
      })

      this.socket.on('get:Nifty50',(value:any) =>{
        console.log(`Nifty Price`);
        console.log(value);
        this.nifty50Price = value[0];
        
      })
    }

    ionViewDidEnter(){
      // this.getAllStocks();
      this.fcm.initPush();
    this.getSocketInteval =   setInterval(() =>{
        this.getAllStocks();
        this.getNifty50Price();
      },1000);
    }

    ionViewDidLeave(){
      clearInterval(this.getSocketInteval);
    }

    getNifty50Price(){
      this.http.get(environment.API +'App/api/live/index')
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
      this.http.get(environment.API +'App/api/live/GetStocks')
      .subscribe({
        next:(value:any) =>{
          console.log(value);
          for (let index = 0; index < value.length; index++) {
            const element = value[index];
            this.stocks.push(element);
            this.isLoading = true;
          }
          
        },
        error:(error) =>{
          console.log(error);
          this.isLoading = false;
          
          
        }
      })
    }
  viewNotifications(){
      this.router.navigate(['notification'])
  }
}
