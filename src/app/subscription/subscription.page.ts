import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { DataService } from '../services/data.service';
import { HapticService } from '../services/haptics.service';
import { SoundService } from '../services/sound.service';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Stripe, PaymentSheetEventsEnum } from '@capacitor-community/stripe';
import { first } from 'rxjs/operators';

declare var Razorpay: any;
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  paymentIntent:any;
  customer:any;
  ephemeralKey:any;

  cardDetails:any = {};
  plans:any[] =[];
  userId!:string;
  constructor(private http: HttpClient,
    private alertController: AlertController,
    private haptics: HapticService,
    private sound:SoundService,
    private router: Router,
    private data: DataService,
    private loadingController: LoadingController) {
      Stripe.initialize({
        publishableKey: environment.StripeKey,
      });
    this.getSubList();
   }

   async ngOnInit() {
    this.userId = await this.data.get("userId");
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
  }

 

  getSubList(){
    // this.presentLoading();
    this.http.get(environment.API +'App/api/v1/getAllPlans')
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.plans = value['plans'];
        // this.loadingController.dismiss();
        
      },
      error:(error) =>{
        console.log(error);
        // this.loadingController.dismiss();

        
      }
    })
  }

  async openStripePaymentPage(amount:string){
    
    await Browser.open({ url: 'https://buy.stripe.com/test_aEU14VeMU8J0d7G9AA', presentationStyle:"popover" })

  }

  async presentAlertConfirm(subId:string) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Make Payment',
          handler: () => {
            console.log('Confirm Okay');
            this.purchaseSubscription(subId);
          }
        }
      ]
    });
  
    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Payment Success',
      subHeader: 'Your Subscription purchase was Successful',
      message: 'You can view the details in profile.',
      buttons: ['OK']
    });
  
    await alert.present();
  }
 pay(amount:any, subId:string){
  console.log(amount);
  this.presentAlertConfirm(subId);
  
 }

 async purchaseSubscription(subId:string){
  let loading = await this.loadingController.create({
    message:"Payment in progress..."
  })
  this.http.put(environment.API + `App/api/v1/get/subscription`, {
    planId: subId,
    userId: this.userId
  }).subscribe({
    next:async(value) =>{
      console.log(value);
      loading.message = "Payment Successfull"
      this.haptics.hapticsImpactLight();
      this.sound.playOne();
      await loading.dismiss();
      this.presentAlert();
      
    },
    error:async (error) =>{
      console.log(error);
      loading.message = "Payment Unsuccessfull"

      await loading.dismiss();
      this.haptics.hapticsImpactMedium();

      
      
    }
  })
 }

 async paymentSheet(amount:any, subId:any){


  // be able to get event of PaymentSheet
  Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
    console.log('PaymentSheetEventsEnum.Completed');
  });
  
  // Connect to your backend endpoint, and get every key.
  // const { paymentIntent, ephemeralKey, customer } = await this.http.post<{
  //   paymentIntent: string;
  //   ephemeralKey: string;
  //   customer: string;
  // }>(environment.API + 'payment-sheet', {}).pipe(first())

  this.http.post(environment.API+"payment-sheet", {
    amount: amount,
    name:"Akshay",
    email:"developer@techlapse.in"
  })
  .subscribe({
    next:(value) =>{
      console.log(value);
      
    },
    error:(error) =>{
      console.log(error);
      
    }
  })
  // prepare PaymentSheet with CreatePaymentSheetOption.
  await Stripe.createPaymentSheet({
    paymentIntentClientSecret: this.paymentIntent,
    customerId: this.customer,
    customerEphemeralKeySecret: this.ephemeralKey,
  });

  // present PaymentSheet and get result.
  const result = await Stripe.presentPaymentSheet();
  if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
    // Happy path
    console.log("Payment Success❤️");
    this.purchaseSubscription(subId);

    

  } if (result.paymentResult === PaymentSheetEventsEnum.Failed) {
    // Happy path
    console.log("Payment Failed");
    

  }
  if (result.paymentResult === PaymentSheetEventsEnum.Canceled) {
    // Happy path
    console.log("Payment Cancelled");
    

  }
  
 }
}
