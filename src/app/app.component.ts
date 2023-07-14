import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { FcmServiceService } from './services/fcm-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn!:boolean;
  constructor(private router: Router,
    private FCM: FcmServiceService,
              private data: DataService) {
                // this.FCM.initPush();
                this.checkUser();
              }


             async checkUser(){
              this.isLoggedIn = await this.data.get("isLoggedIn");
              if(this.isLoggedIn){
                this.router.navigate(['tabs', 'tab2']);

              }else{
                this.router.navigate(['']);
              }
             }
}
