import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CampsiteService } from './services/campsite.service';
import { CampsiteGuard } from './guards/campsite.guard';
import { CampsiteConfig } from './definitions/CampsiteConfig';
import { CampsiteDataProvider } from './definitions/CampsiteDataProvider';
import { CampsiteSimpleGuard } from './guards/campsite-simple.guard';
import { IAdminItem } from '../admin/definitions/IAdminItem';
import { CampsiteEntriesAdminPageComponent } from '../admin/pages/campsite-entries-admin-page/campsite-entries-admin-page.component';
import { CampsiteField } from './definitions/CampsiteFieldType';
import { CampsiteBlock } from './definitions/CampsiteBlock';
import { CampsiteEntry } from './definitions/CampsiteEntry';


@NgModule({
  imports: []
})
export class CampsiteModule {
  public static version = '0.1';

  public static dataProvider: CampsiteDataProvider;
  public static adminExtensions: IAdminItem[];

  public static fields?: CampsiteField[];
  public static blocks?: CampsiteBlock[];
  public static entryTypes?: CampsiteEntry[];

  static initialise(options?: CampsiteConfig): ModuleWithProviders<CampsiteModule> {
    CampsiteModule.dataProvider = options?.dataProvider as any;
    CampsiteModule.fields = options?.register?.fields as any;
    CampsiteModule.blocks = options?.register?.blocks as any;
    CampsiteModule.entryTypes = options?.register?.entryTypes as any;
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
