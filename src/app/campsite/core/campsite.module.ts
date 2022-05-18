import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CampsiteService } from './services/campsite.service';
import { CampsiteGuard } from './guards/campsite.guard';
import { CampsiteConfig } from './definitions/CampsiteConfig';
import { CampsiteAdminModule } from '../admin/campsite-admin.module';


@NgModule({
  imports: [
    CampsiteAdminModule
  ]
})
export class CampsiteModule {
  static initialise(options?: CampsiteConfig): ModuleWithProviders<CampsiteModule> {
    return {
      ngModule: CampsiteModule,

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
    };
  }
}

export function initCampsite(campsite: CampsiteService) {
  return () => campsite.initialise();
}
