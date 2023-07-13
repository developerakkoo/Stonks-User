import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-stripe-payement',
  templateUrl: './stripe-payement.page.html',
  styleUrls: ['./stripe-payement.page.scss'],
})
export class StripePayementPage implements OnInit {

  paymentAmount:any;
  card: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  

}
