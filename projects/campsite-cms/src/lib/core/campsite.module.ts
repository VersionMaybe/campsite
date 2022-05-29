import { APP_INITIALIZER, ModuleWithProviders, NgModule, PLATFORM_ID } from '@angular/core';
import { CampsiteService } from './services/campsite.service';
import { CampsiteConfig, ICampsiteConfig } from './definitions/CampsiteConfig';
import { CampsiteSimpleGuard } from './guards/campsite-simple.guard';
import { CampsiteRoutingAdminPageComponent } from '../admin/pages/campsite-routing-admin-page/campsite-routing-admin-page.component';
import { CampsiteEntriesAdminPageComponent } from '../admin/pages/campsite-entries-admin-page/campsite-entries-admin-page.component';
import { PrebootModule, } from 'preboot';
import { isPlatformBrowser, ɵgetDOM } from '@angular/common';

@NgModule({
  imports: [
    PrebootModule.withConfig({ appRoot: 'app-root' }),
  ]
})
export class CampsiteModule {
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
        CampsiteSimpleGuard,
        CampsiteService,
        {
          provide: APP_INITIALIZER,
          useFactory: initCampsite,
          deps: [CampsiteService],
          multi: true,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: function (platformId: Object): Function {
            return () => {
              if (isPlatformBrowser(platformId)) {
                const dom = ɵgetDOM().getDefaultDocument();
                const styles: any[] = Array.prototype.slice.apply(dom.querySelectorAll(`style[ng-transition]`));
                styles.forEach(el => {
                  el.removeAttribute('ng-transition');
                });
                document.addEventListener('PrebootComplete', () => {
                  setTimeout(() => styles.forEach(el => ɵgetDOM().remove(el)));
                });
              }
            };
          },
          deps: [PLATFORM_ID],
          multi: true
        }
      ]
    };
  }
}

export function initCampsite(campsite: CampsiteService) {
  return () => campsite.initialise();
}
