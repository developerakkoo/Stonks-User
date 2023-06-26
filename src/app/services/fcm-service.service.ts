import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class FcmServiceService {

  constructor(private router: Router,
              private data: DataService) { }

  public initPush(){
    if(Capacitor.platform !== 'web'){
      this.registerPush();
    }
  }

  registerPush(){
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
  
});

PushNotifications.addListener('registration', async (token: Token) => {
  alert('Push registration success, token: ' + token.value);
  console.log('Push registration success, token: ' + token.value);
  await this.data.set("firebaseToken", token.value);
});

PushNotifications.addListener('registrationError', (error: any) => {
  alert('Error on registration: ' + JSON.stringify(error));
  console.log('Error on registration: ' + JSON.stringify(error));
});

PushNotifications.addListener(
  'pushNotificationReceived',
  (notification: PushNotificationSchema) => {
    alert('Push received: ' + JSON.stringify(notification));
    console.log('Push received: ' + JSON.stringify(notification));
    
  },
);

PushNotifications.addListener(
  'pushNotificationActionPerformed',
  (notification: ActionPerformed) => {
    alert('Push action performed: ' + JSON.stringify(notification));
    console.log('Push action performed: ' + JSON.stringify(notification));
  },
);

  }
}
