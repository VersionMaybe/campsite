import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CampsiteService } from './services/campsite.service';
import { CampsiteGuard } from './guards/campsite.guard';
import { CampsiteConfig, ICampsiteConfig } from './definitions/CampsiteConfig';
import { CampsiteSimpleGuard } from './guards/campsite-simple.guard';
import { CampsiteRoutingAdminPageComponent } from '../admin/pages/campsite-routing-admin-page/campsite-routing-admin-page.component';
import { CampsiteEntriesAdminPageComponent } from '../admin/pages/campsite-entries-admin-page/campsite-entries-admin-page.component';
import { QuoteBlockModule } from './blocks/quote-block/quote-block.module';

@NgModule({
  imports: [
    QuoteBlockModule
  ]
})
export class CampsiteModule {
  public static version = '0.0.2-a.2';

  static initialise(options: ICampsiteConfig): ModuleWithProviders<CampsiteModule> {
    options.adminExtensions?.unshift(
      {
        id: 'entries',
        label: 'Entries',
        icon: 'apps',
        component: CampsiteEntriesAdminPageComponent
      },
      {
        id: 'routing',
        label: 'Routing',
        icon: 'route',
        component: CampsiteRoutingAdminPageComponent
      },
      {
        id: 'globals',
        icon: 'code',
        label: 'Globals'
      },
      {
        id: 'utilities',
        label: 'Utilities',
        icon: 'app_settings_alt',
        alerts: 5
      },
      {
        id: 'settings',
        icon: 'settings',
        label: 'Settings'
      }
    );

    CampsiteConfig.initialise(options);

    return {
      ngModule: CampsiteModule,

      providers: [
        CampsiteGuard,
        CampsiteSimpleGuard,
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
