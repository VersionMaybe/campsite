import { APP_INITIALIZER, Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { CampsiteService } from './services/campsite.service';
import { CampsiteConfig, ICampsiteConfig } from './definitions/CampsiteConfig';
import { CampsiteSimpleGuard } from './guards/campsite-simple.guard';
import { CampsiteRoutingAdminPageComponent } from '../admin/pages/campsite-routing-admin-page/campsite-routing-admin-page.component';
import { CampsiteEntriesAdminPageComponent } from '../admin/pages/campsite-entries-admin-page/campsite-entries-admin-page.component';
import { PRELOADED_ROUTES } from './definitions/CampsiteDataProvider';
import { Router, Routes } from '@angular/router';
import { ListBlockModule } from './blocks/list-block/list-block.module';
import { QuoteBlockModule } from './blocks/quote-block/quote-block.module';

@NgModule({
  imports: []
})
export class CampsiteModule {
  constructor(@Inject(PRELOADED_ROUTES) dynamicRoutes: Routes, router: Router) {
    router.resetConfig(dynamicRoutes);
  }

  static initialise(options: ICampsiteConfig): ModuleWithProviders<CampsiteModule> {
    if (!options.pageModules) options.pageModules = [];
    options.pageModules.unshift(
      ListBlockModule,
      QuoteBlockModule,
    );
    options.adminExtensions?.unshift(
      {
        id: 'dashboard',
        label: 'Home',
        icon: 'home'
      },
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
        id: 'users',
        label: 'Users',
        icon: 'people'
      },
      // {
      //   id: 'globals',
      //   icon: 'code',
      //   label: 'Globals'
      // },
      // {
      //   id: 'utilities',
      //   label: 'Utilities',
      //   icon: 'app_settings_alt',
      //   alerts: 5
      // },
      // {
      //   id: 'settings',
      //   icon: 'settings',
      //   label: 'Settings'
      // }
    );

    CampsiteConfig.initialise(options);

    return {
      ngModule: CampsiteModule,

      providers: [
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
