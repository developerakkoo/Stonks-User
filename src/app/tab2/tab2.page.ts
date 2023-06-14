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
  put:any;
  stoploss:any;
  target:any;
  isCall:any;
  date:any;

  nifty50inteval:any;
  constructor(private http: HttpClient,
              private data: DataService,
              private router: Router,
              private socket: Socket,
              private haptics: HapticService,
              ) {
                console.log(moment().format("DD-MM-YYYY"));
                this.date = moment().format("DD-MM-YYYY");
                let url = this.router.url;
                console.log(url);
                this.socket.connect();
                this.socket.on('get:Nifty50',(value:any) =>{
                  console.log(`Nifty Price`);
                  console.log(value);
                  this.nifty50Price = value[0]['LTP'];
                  
                })
                
              }


              ionViewDidEnter(){
                console.log("Tab 2 loaded");
               this.nifty50inteval =  setInterval(() =>{
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
                    console.log(value);
                    if(value['stocks']){
                      this.call = value['stock'][0]['call'];
                      this.put = value['stock'][0]['put'];
                      this.stoploss = value['stock'][0]['stopLoss'];
                      this.target = value['stock'][0]['targetPrice'];
                      this.isCall = value['stock'][0]['isCall'];
                    }
                    
                  },
                  error:(error) =>{
                    console.log(error);
                    
                  }
                })
              }

}
