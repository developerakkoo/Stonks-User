import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../services/data.service';
import { HapticService } from '../services/haptics.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  nifty50Price:any;
  call:any;
  stock:any[] = [];
  put:any;
  stoploss:any;
  target:any;
  isCall:boolean = false;
  date:any;
  entryPrice:any;

  isNoCallToday!:boolean;
  nifty50inteval:any;
  constructor(private http: HttpClient,
              private data: DataService,
              private router: Router,
              private socket: Socket,
              private haptics: HapticService,
              ) {
                console.log(moment().format("DD-MM-YYYY"));
                this.date = moment().format("MM-DD-YYYY");
                let url = this.router.url;
                console.log(url);
                console.log(this.date);
                
                this.socket.connect();
                this.socket.on('get:Nifty50',(value:any) =>{
                  console.log(`Nifty Price`);
                  console.log(value);
                  this.nifty50Price = value[0]['LTP'];
                  
                })
                this.socket.on('get:isNoCall',(value:any) =>{
                  console.log("is no call status");
                  
                  console.log(value);
                  
                })
                
              }


              ionViewDidEnter(){
                console.log(moment().format("DD-MM-YYYY"));
                this.date = moment().format("DD-MM-YYYY");
                console.log("Tab 2 loaded");
                // this.getNifty50Price();
                // this.getNoCallStatus();
                // this.getCallPutData();
                this.nifty50inteval =  setInterval(() =>{
                 this.getNoCallStatus();
                  this.getCallPutData();
                this.getNifty50Price();
                },2000)
                
                
                
              }

              ionViewDidLeave(){
                clearInterval(this.nifty50inteval);
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
              getCallPutData(){
                this.http.get(environment.API +'App/api/v1/getDataByDate/'+this.date).subscribe({
                  next:(value:any) =>{
                    console.log("CAlls DATA --");
                    console.log(value);
                    if(value['stock']){
                      this.stock = value['stock'];
                      this.call = value['stock'][0]['call'];
                      this.stoploss = value['stock'][0]['stopLoss'];
                      this.target = value['stock'][0]['targetPrice'];
                      this.isCall = value['stock'][0]['isCall'];
                      this.entryPrice = value['stock'][0]['entryPrice']
                    }
                    
                  },
                  error:(error) =>{
                    console.log(error);
                    console.log(error.status);
                    if(error.status === 400){
                      console.log("set to true fro 400 code");
                      
                      this.isNoCallToday = true;
                    }
                    
                  }
                })
              }


              getNoCallStatus(){
                this.http.get(environment.API +"api/get/noCall/6494098da741612bc7797121")
                .subscribe({
                  next:(value:any) =>{
                    console.log(value);
                    this.isNoCallToday = value['data']['isNoCall'];
                  },
                  error:(error) =>{
                    console.log(error);
                    
                  }
                })
              }

}
