import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampsiteGuard } from './campsite/core/guards/campsite.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
