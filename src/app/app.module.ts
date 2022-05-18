import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampsiteModule } from './campsite/core/campsite.module';
import { LocalStorageDataProvider } from './campsite/core/providers/LocalStorageDataProvider';
import { LandingPageModule } from './campsite/example/pages/landing-page/landing-page.module';

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
        LandingPageModule
      ]
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
