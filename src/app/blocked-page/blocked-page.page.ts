import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blocked-page',
  templateUrl: './blocked-page.page.html',
  styleUrls: ['./blocked-page.page.scss'],
})
export class BlockedPagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToSubscriptionPage(){
    this.router.navigate(['subscription']);
  }
}
