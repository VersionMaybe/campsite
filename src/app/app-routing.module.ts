import { Inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ICampsiteRoute, CampsiteConfig, PRELOADED_ROUTES } from 'campsite-cms';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(@Inject(PRELOADED_ROUTES) private dynamicRoutes: Routes, private router: Router) {
    this.router.resetConfig(dynamicRoutes);
  }
}
