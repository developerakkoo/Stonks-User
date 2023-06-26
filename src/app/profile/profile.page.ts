import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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


  constructor(private data: DataService,
              private http: HttpClient) { }

  async ngOnInit() {
   this.userId = await this.data.get("userId");
   this.getUserProfile();
  }

  getUserProfile(){
    this.http.get(environment.API +`App/api/v1/get/user/${this.userId}`)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.email = value['user']['email'];
        this.name = value['user']['name'];
        this.photo = value['user']['photo'];
        
      },
      error:(error) =>{
        console.log(error);
        
      }
    })
  }

}
