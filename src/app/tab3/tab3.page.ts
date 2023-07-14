import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HapticService } from '../services/haptics.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private router: Router,
              private data: DataService,
              private haptics: HapticService) {}


  goToPage(name: string){
    this.haptics.hapticsImpactLight();
    this.router.navigate([name]);
  }

  async onLogout(){
    this.data.remove("isLoggedIn");
    this.router.navigate([''])
  }
}
