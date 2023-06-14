import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HapticService } from '../services/haptics.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private router: Router,
              private haptics: HapticService) {}


  goToPage(name: string){
    this.haptics.hapticsImpactLight();
    this.router.navigate([name]);
  }
}
