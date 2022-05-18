import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LandingPage } from '../../example/pages/landing-page/landing-page.component';
import { QuoteBlock } from '../blocks/quote-block';
import { CampsiteBlock } from '../definitions/campsite-block';
import { CampsiteEntry } from '../definitions/campsite-entry';
import { CampsiteField } from '../definitions/campsite-field';
import { CampsiteRouteType, ICampsiteRoute } from '../definitions/ICampsiteRouteData';
import { ICampsiteLog } from '../definitions/ICampsiteLog';
import { NumberField } from '../fields/number-fields';
import { ParagraphField } from '../fields/paragraph-field';
import { UrlField } from '../fields/url-field';
import { CampsiteDataService } from './campsite-data.service';
import { first, ReplaySubject, Subject } from 'rxjs';
import { CampsiteGuard } from './campsite.guard';

@Injectable({
  providedIn: 'root'
})
export class CampsiteService {

  fields: CampsiteField[] = [];
  blocks: CampsiteBlock[] = [];
  entries: CampsiteEntry[] = [];

  private initialised = new ReplaySubject<boolean>(1);

  constructor(
    private router: Router,
    private campsiteDataService: CampsiteDataService
  ) { }

  public log({
    message, type = 'info', args
  }: ICampsiteLog) {
    if (type !== 'error') {
      console.log(`[Campsite (${type})] ${message}`, args);
    } else {
      console.error(`[Campsite] ${message}`, args);
    }
  }

  public async initialise() {
    this.router.config.push({
      path: '**', canActivate: [CampsiteGuard], canActivateChild: [CampsiteGuard], children: []
    });

    this.registerFields([
      new NumberField(),
      new ParagraphField(),
      new UrlField()
    ]);

    this.registerBlocks([
      new QuoteBlock()
    ]);

    this.registerEntryTypes([
      new LandingPage()
    ]);

    await this.syncRoutes();
    this.router.config.shift();
    // If we don't have the page then try 404. and if no 4040 then back to the homepage.
    this.router.config.push({ path: '**', redirectTo: '404' });
    this.router.config.push({ path: '**', redirectTo: '' });
    this.initialised.next(true);
  }

  public waitForInitialisation() {
    return this.initialised.pipe(first()).toPromise();
  }

  public async syncRoutes() {
    const routes = await this.campsiteDataService.getAllRoutes();
    routes.forEach((e) => this.registerRoute(e));
  }

  public registerFields(fields: CampsiteField[]) {
    this.fields = this.fields.concat(fields);
  }

  public registerBlocks(blocks: CampsiteBlock[]) {
    this.blocks = this.blocks.concat(blocks);
  }

  public registerEntryTypes(entries: CampsiteEntry[]) {
    this.entries = this.entries.concat(entries);
  }

  public registerRoute(route: ICampsiteRoute) {
    const component = this.entries.find((x) => x.id === route.entry);
    if (!component) {
      this.log({ message: `Route '${route.path}' cannot find entry component with id: '${route.entry}'`, type: 'error' })
      return;
    }

    this.router.config.push({
      path: route.path,
      component: component.component,
      data: {
        campsiteData: route
      }
    });
  }
}