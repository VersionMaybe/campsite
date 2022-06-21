import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Imported
import { CampsiteModule, FirebaseDataProvider } from 'campsite-cms';
import { environment } from 'src/environments/environment';
import { LandingPage } from './landing-page/landing-page.component';
import { LandingPageModule } from './landing-page/landing-page.module';
import { QuoteModule } from './templates/sections/quote/quote.module';
import { ListBlock, QuoteBlock } from 'campsite-cms';

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
        blocks: [
          new ListBlock(),
          new QuoteBlock()
        ],
        templates: [
          new LandingPage(),
        ]
      },
      adminExtensions: [],
      pageModules: [
        QuoteModule
      ]
    }),

    LandingPageModule,
    // GeneralPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
