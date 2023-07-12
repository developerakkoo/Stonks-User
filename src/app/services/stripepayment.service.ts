// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { PaymentFlowEventsEnum, Stripe } from '@capacitor-community/stripe';
// import { first } from 'rxjs';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class StripepaymentService {

//   constructor(private http: HttpClient) {
//     Stripe.initialize({
//       publishableKey: environment.StripeKey,
//     });
//   }

//   async paymentFlow(name:string, email:string, amount:number,currecy:string) {


//     try {
//       // be able to get event of PaymentFlow
//       Stripe.addListener(PaymentFlowEventsEnum.Completed, () => {
//         console.log('PaymentFlowEventsEnum.Completed');
//       });

//       // Connect to your backend endpoint, and get every key.
//       const { paymentIntent, ephemeralKey, customer } = await this.http.post<{
//         paymentIntent: string;
//         ephemeralKey: string;
//         customer: string;
//       }>(environment.API + 'payment-sheet', {}).pipe(first()).toPromise(Promise);

//       // Prepare PaymentFlow with CreatePaymentFlowOption.
//       Stripe.createPaymentFlow({
//         paymentIntentClientSecret: paymentIntent,
//         // setupIntentClientSecret: setupIntent,
//         customerEphemeralKeySecret: ephemeralKey,
//         customerId: customer,
//       });

//       // Present PaymentFlow. **Not completed yet.**
//       const presentResult = await Stripe.presentPaymentFlow();
//       console.log(presentResult); // { cardNumber: "●●●● ●●●● ●●●● ****" }

//       // Confirm PaymentFlow. Completed.
//       const confirmResult = await Stripe.confirmPaymentFlow();
//       if (confirmResult.paymentResult === PaymentFlowEventsEnum.Completed) {
//         // Happy path
//       }

//     } catch (err) {
//       console.log(err);

//     }

//   }
// }
