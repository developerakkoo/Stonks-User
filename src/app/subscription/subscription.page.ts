import { HttpClient, HttpParams } from '@angular/common/http';
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
import { lastValueFrom } from 'rxjs';

declare var Razorpay: any;
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  data:any = {
    amount:100,
    name: "",
    email: ""
  };
  paymentIntent:any;
  customer:any;
  ephemeralKey:any;

  email:any;
  name:any;


  cardDetails:any = {};
  plans:any[] =[];
  userId!:string;
  constructor(private http: HttpClient,
    private alertController: AlertController,
    private haptics: HapticService,
    private sound:SoundService,
    private router: Router,
    private dataService: DataService,
    private loadingController: LoadingController) {
      Stripe.initialize({
        publishableKey: environment.StripeKey,
      }).then((value) =>{
        console.log(value);
        console.log("Stripe Onitialized");
        
        
      }).catch((err) =>{
        console.log(err);
        
      })
    this.getSubList();
   }

   async ngOnInit() {
    this.userId = await this.dataService.get("userId");
    this.getUserProfile();
  }


  getUserProfile(){
    this.http.get(environment.API +`App/api/v1/get/user/${this.userId}`)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.email = value['user']['email'];
        this.name = value['user']['name'];
        this.data['email'] = value['user']['email'];
        this.data['name'] = value['user']['name'];
      },
      error:(error) =>{
        console.log(error);
        
      }
    })
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

  async presentAlertConfirm(subId:string, amount:string) {
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
            this.paymentSheet(amount, subId);
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
 pay(amount:string, subId:string){
  console.log(amount);
  this.presentAlertConfirm(subId, amount);
  
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

 async paymentSheet(amount:string, subId:any){


 
     // be able to get event of PaymentSheet
     Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
      console.log('PaymentSheetEventsEnum.Completed');
    });

    Stripe.addListener(PaymentSheetEventsEnum.Failed, (value) => {
      console.log(value);
      alert(value);
    });
 
  
  // Connect to your backend endpoint, and get every key.
  const data$ = await this.http.post<{
    paymentIntent: string;
    ephemeralKey: string;
    customer: string;
  }>(environment.API + 'payment-sheet',{
    name: this.name,
    email: this.email,
    amount: amount
  }).pipe(first())

  const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);

  await Stripe.createPaymentSheet({
    merchantDisplayName:"Nifty Level Tracker",
    paymentIntentClientSecret:paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    countryCode:"IN",
    
  });



   // present PaymentSheet and get result.
const result = await Stripe.presentPaymentSheet();
if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
// Happy path
console.log("Payment Success❤️");
this.purchaseSubscription(subId);



} else if (result.paymentResult === PaymentSheetEventsEnum.Failed) {
// Happy path
console.log("Payment Failed");


}
else if (result.paymentResult === PaymentSheetEventsEnum.Canceled) {
// Happy path
console.log("Payment Cancelled");


}
  // this.http.post(environment.API+"payment-sheet", {
  //   amount: amount,
  //   name:this.name,
  //   email:this.email
  // })
  // .subscribe({
  //   next:async (value:any) =>{
  //     console.log(value);
  //     this.customer = value['customer'];
  //     this.ephemeralKey = value['ephemeralKey'];
  //     this.paymentIntent = value['paymentIntent'];
  //   },
  //   error:(error) =>{
  //     console.log("ERROR IN STRIPE");
      
  //     console.log(error);
      
  //   }
  // })
 

 
 }
}
