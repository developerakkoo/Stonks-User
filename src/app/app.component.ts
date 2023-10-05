import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { FcmServiceService } from './services/fcm-service.service';
import { Stripe } from '@capacitor-community/stripe';
import { environment } from 'src/environments/environment';
import { AppRate, AppRateReviewTypeAndroid, AppRateReviewTypeIos } from '@awesome-cordova-plugins/app-rate/ngx';
import { AppRatePreferences } from 'cordova-plugin-apprate';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn!:boolean;
  constructor(private router: Router,
    private FCM: FcmServiceService,
    private appRate: AppRate,
    private iab: InAppBrowser,
    private platform: Platform,
              private data: DataService) {
                // this.FCM.initPush();
                this.checkUser();
                this.platform.backButton.subscribeWithPriority(-1, () => {
                  if (this.router.url == '' || this.router.url == '/tabs/tab1') {
                    this.showRatingPrompt();
                  }
                });
              }


             async checkUser(){
              this.isLoggedIn = await this.data.get("isLoggedIn");
              if(this.isLoggedIn){
                this.router.navigate(['tabs', 'tab2']);

              }else{
                this.router.navigate(['']);
              }
             }

                

     showRatingPrompt() {
      console.log("Show rating...");
      this.appRate.setPreferences({
        displayAppName: 'Nifty Level Tracker',
        usesUntilPrompt: 5,
        promptAgainForEachNewVersion: false,
        reviewType: {
          ios: AppRateReviewTypeIos.AppStoreReview,
          android: AppRateReviewTypeAndroid.InAppBrowser
        },
        storeAppURL: {
          // ios: '<my_app_id>',
          android: 'market://details?id=io.stocks.techlapse',
        },
        customLocale: {
          title: "Would you mind rating %@?",
          message: "It won’t take more than a minute and helps to promote our app. Thanks for your support!",
          cancelButtonLabel: "No, Thanks",
          laterButtonLabel: "Remind Me Later",
          rateButtonLabel: "Rate It Now",
          yesButtonLabel: "Yes!",
          noButtonLabel: "Not really",
          appRatePromptTitle: 'Do you like using %@',
          feedbackPromptTitle: 'Mind giving us some feedback?',
        },
        callbacks: {
          handleNegativeFeedback: function(){
            console.log("Handle Negative FeedBack");
            
            window.open('mailto:nlvltracker@gmail.com', '_system');
          },
          onRateDialogShow: function(callback){
            callback(1) // cause immediate click on 'Rate Now' button
          },
          onButtonClicked: function(buttonIndex){
            console.log("onButtonClicked -> " + buttonIndex);
          }
        }
      });
      
      this.appRate.promptForRating(true);
    }

          
}
