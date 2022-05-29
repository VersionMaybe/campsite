import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CampsiteConfig, PRELOADED_ROUTES } from 'campsite-cms';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

async function bootstrap() {
  const routes = await CampsiteConfig.dataProvider?.preloadRoutes(CampsiteConfig.register?.templates as any);
  platformBrowserDynamic([
    { provide: PRELOADED_ROUTES, useValue: routes }
  ]).bootstrapModule(AppModule)
    .catch(err => console.error(err));
};


if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}

