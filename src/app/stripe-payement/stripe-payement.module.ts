import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StripePayementPageRoutingModule } from './stripe-payement-routing.module';

import { StripePayementPage } from './stripe-payement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StripePayementPageRoutingModule
  ],
  declarations: [StripePayementPage]
})
export class StripePayementPageModule {}
