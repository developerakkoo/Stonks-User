import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnlayticsPageRoutingModule } from './anlaytics-routing.module';

import { AnlayticsPage } from './anlaytics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnlayticsPageRoutingModule
  ],
  declarations: [AnlayticsPage]
})
export class AnlayticsPageModule {}
