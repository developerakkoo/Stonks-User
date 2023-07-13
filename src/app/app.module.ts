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
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';

const config: SocketIoConfig = { url: 'https://api.niftyleveltracker.in', options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
    IonicStorageModule.forRoot({name: 'stonks-user'}),SocketIoModule.forRoot(config),
    provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()),

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Stripe],
  bootstrap: [AppComponent],
})
export class AppModule {}
