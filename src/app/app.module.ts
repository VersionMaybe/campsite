import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { CampsiteEntriesAdminPageComponent } from './campsite/admin/pages/campsite-entries-admin-page/campsite-entries-admin-page.component';
import { CampsiteModule } from './campsite/core/campsite.module';
import { LocalStorageDataProvider } from './campsite/core/providers/LocalStorageDataProvider';
import { GeneralPage } from './campsite/example/pages/general-page/general-page.component';
import { GeneralPageModule } from './campsite/example/pages/general-page/general-page.module';
import { LandingPage } from './campsite/example/pages/landing-page/landing-page.component';
import { LandingPageModule } from './campsite/example/pages/landing-page/landing-page.module';
import { environment } from '../environments/environment';
import { FirebaseDataProvider } from './campsite/core/providers/FirebaseDataProvider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CampsiteModule.initialise({
      dataProvider: new FirebaseDataProvider(environment.firebase),
      register: {
        entryTypes: [
          new GeneralPage(),
          new LandingPage(),
        ]
      },
      adminExtensions: []
    }),

    LandingPageModule,
    GeneralPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
