import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnlayticsPage } from './anlaytics.page';

const routes: Routes = [
  {
    path: '',
    component: AnlayticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnlayticsPageRoutingModule {}
