import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Imported
import { CampsiteModule, FirebaseDataProvider } from 'campsite-cms';
import { environment } from 'src/environments/environment';
import { LandingPage } from './landing-page/landing-page.component';
import { LandingPageModule } from './landing-page/landing-page.module';

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
        templates: [
          // new GeneralPage(),
          new LandingPage(),
        ]
      },
      adminExtensions: []
    }),

    LandingPageModule,
    // GeneralPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
