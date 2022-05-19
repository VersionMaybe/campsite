import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CampsiteService } from './services/campsite.service';
import { CampsiteGuard } from './guards/campsite.guard';
import { CampsiteConfig } from './definitions/CampsiteConfig';
import { CampsiteAdminModule } from '../admin/campsite-admin.module';
import { CampsiteDataProvider } from './definitions/CampsiteDataProvider';
import { CampsiteSimpleGuard } from './guards/campsite-simple.guard';
import { IAdminItem } from '../admin/definitions/IAdminItem';
import { CampsiteEntriesAdminPageComponent } from '../admin/pages/campsite-entries-admin-page/campsite-entries-admin-page.component';


@NgModule({
  imports: [
    CampsiteAdminModule
  ]
})
export class CampsiteModule {
  public static dataProvider: CampsiteDataProvider;
  public static adminExtensions: IAdminItem[];

  static initialise(options?: CampsiteConfig): ModuleWithProviders<CampsiteModule> {
    CampsiteModule.dataProvider = options?.dataProvider as any;
    CampsiteModule.adminExtensions = [
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
        component: CampsiteEntriesAdminPageComponent
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
      },
      ...(options?.adminExtensions as any || [])
    ]

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
