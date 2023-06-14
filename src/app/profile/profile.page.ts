import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name!:string;
  email!:string;
  photo!:string;
  constructor(private data: DataService) { }

  async ngOnInit() {
    this.name = await this.data.get("name");
    this.email = await this.data.get("email");
    this.photo = await this.data.get("photo");
  }

}
