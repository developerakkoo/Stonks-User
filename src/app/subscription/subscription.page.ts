import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
declare var Razorpay: any;
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  plans:any[] =[];
  constructor(private http: HttpClient,
    private loadingController: LoadingController) {
    this.getSubList();
   }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
  }

  getSubList(){
    this.presentLoading();
    this.http.get(environment.API +'App/api/v1/getAllPlans')
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.plans = value['plans'];
        this.loadingController.dismiss();
        
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();

        
      }
    })
  }

 pay(amount:any){
  console.log(amount);
  
 }
}
