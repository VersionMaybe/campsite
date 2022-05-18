import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CampsiteService } from './services/campsite.service';
import { CampsiteGuard } from './guards/campsite.guard';
import { CampsiteConfig } from './definitions/CampsiteConfig';
import { CampsiteAdminModule } from '../admin/campsite-admin.module';
import { CampsiteDataProvider } from './definitions/CampsiteDataProvider';


@NgModule({
  imports: [
    CampsiteAdminModule
  ]
})
export class CampsiteModule {
  public static dataProvider: CampsiteDataProvider;

  static initialise(options?: CampsiteConfig): ModuleWithProviders<CampsiteModule> {
    CampsiteModule.dataProvider = options?.dataProvider as any;

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
