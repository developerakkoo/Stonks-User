import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRate } from '@awesome-cordova-plugins/app-rate/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
// API:"http://192.168.3.105:8000",
const config: SocketIoConfig = { url: 'https://api.niftyleveltracker.in',  options: {
  autoConnect:true
} };

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
    IonicStorageModule.forRoot({name: 'stonks-user'}),SocketIoModule.forRoot(config),
    provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()),

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Stripe,AppRate,InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule {}
