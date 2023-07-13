import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StripePayementPage } from './stripe-payement.page';

const routes: Routes = [
  {
    path: '',
    component: StripePayementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StripePayementPageRoutingModule {}
