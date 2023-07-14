import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockedPagePageRoutingModule } from './blocked-page-routing.module';

import { BlockedPagePage } from './blocked-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlockedPagePageRoutingModule
  ],
  declarations: [BlockedPagePage]
})
export class BlockedPagePageModule {}
