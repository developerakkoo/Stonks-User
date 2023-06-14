import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistePage } from './registe.page';

const routes: Routes = [
  {
    path: '',
    component: RegistePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistePageRoutingModule {}
