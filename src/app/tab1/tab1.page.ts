import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  stocks:any[] = [];
  isLoading: boolean = false;

  getSocketInteval:any;
  constructor(private router: Router,
            private socket: Socket,
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
    }

    ionViewDidEnter(){
    this.getSocketInteval =   setInterval(() =>{
        this.getAllStocks();
      },2000);
    }

    ionViewDidLeave(){
      clearInterval(this.getSocketInteval);
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
