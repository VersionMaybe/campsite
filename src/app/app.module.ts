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
// import { LandingPageComponent } from './campsite/example/pages/landing-page/landing-page.component';
import { LandingPageModule } from './campsite/example/pages/landing-page/landing-page.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CampsiteModule.initialise({
      dataProvider: new LocalStorageDataProvider(),
      pageModules: [
        LandingPageModule,
        GeneralPageModule
      ],
      register: {
        entryTypes: [
          new GeneralPage(),
          new LandingPage(),
        ]
      },
      adminExtensions: []
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
