import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn!:boolean;
  constructor(private router: Router,
              private data: DataService) {
                this.checkUser();
              }


             async checkUser(){
              this.isLoggedIn = await this.data.get("isLoggedIn");
              if(this.isLoggedIn){
                this.router.navigate(['tabs', 'tabs', 'tab1']);

              }else{
                this.router.navigate(['']);
              }
             }
}
