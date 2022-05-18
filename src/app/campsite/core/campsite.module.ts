import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampsiteService } from './services/campsite.service';
import { LandingPageModule } from '../example/pages/landing-page/landing-page.module';
import { CampsiteGuard } from './services/campsite.guard';



@NgModule({
  imports: [
    CommonModule,
    LandingPageModule
  ],
  exports: [],
  providers: [
    CampsiteGuard,
    CampsiteService,
    {
      provide: APP_INITIALIZER,
      useFactory: initCampsite,
      deps: [CampsiteService],
      multi: true,
    }
  ]
})
export class CampsiteModule { }

export function initCampsite(campsite: CampsiteService) {
  return () => campsite.initialise();
}
