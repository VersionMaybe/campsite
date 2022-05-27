import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CampsiteBlock } from '../definitions/CampsiteBlock';
import { CampsiteTemplate } from '../definitions/CampsiteTemplate';
import { CampsiteField } from '../definitions/CampsiteFieldType';
import { ICampsiteRoute } from '../definitions/CampsiteRoute';
import { ICampsiteLog } from '../definitions/CampsiteLog';
import { NumberField } from '../fields/number-fields';
import { ParagraphField } from '../fields/paragraph-field';
import { UrlField } from '../fields/url-field';
import { CampsiteDataService } from './campsite-data.service';
import { ReplaySubject } from 'rxjs';
import { CampsiteGuard } from '../guards/campsite.guard';
import { CampsiteSimpleGuard } from '../guards/campsite-simple.guard';
import { CampsiteConfig } from '../definitions/CampsiteConfig';

@Injectable({
  providedIn: 'root'
})
export class CampsiteService {

  fields: CampsiteField[] = [];
  blocks: CampsiteBlock[] = [];
  templates: CampsiteTemplate[] = [];
  routes: ICampsiteRoute[] = [];

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
    console.log('Initialising...');
    this.router.config.push({
      path: '**', data: { campsiteHijacker: true }, canActivate: [CampsiteGuard], canActivateChild: [CampsiteGuard], children: []
    });

    this.registerFields([
      new NumberField(),
      new ParagraphField(),
      new UrlField(),
      ...(CampsiteConfig.register?.fields || [])
    ]);

    this.registerBlocks([
      ...(CampsiteConfig.register?.blocks || [])
    ]);

    this.registerTemplates([...(CampsiteConfig.register?.templates || [])]);

    await this.syncRoutes();
    this.router.config.splice(this.router.config.findIndex((x) => x.data?.['campsiteHijacker']), 1);
    this.router.config.push({ path: 'admin', loadChildren: () => import('../../admin/campsite-admin.module').then(m => m.CampsiteAdminModule) });
    // If we don't have the page then try 404. and if no 4040 then back to the homepage.
    this.router.config.push({ path: '**', redirectTo: '404' });
    this.router.config.push({ path: '**', redirectTo: '' });
    CampsiteConfig.initialised.next(true);
    console.log('Done!', this.router.config);
  }

  public async syncRoutes() {
    const routes = await this.campsiteDataService.getAllRoutes();
    this.routes = routes;
    routes.forEach((e) => this.registerRoute(e));
  }

  public registerFields(fields: CampsiteField[]) {
    this.fields = this.fields.concat(fields);
  }

  public registerBlocks(blocks: CampsiteBlock[]) {
    this.blocks = this.blocks.concat(blocks);
  }

  public registerTemplates(templates: CampsiteTemplate[]) {
    this.templates = this.templates.concat(templates);
  }

  public registerRoute(route: ICampsiteRoute) {
    const component = this.templates.find((x) => x.id === route.template);
    if (!component) {
      this.log({ message: `Route '${route.path}' cannot find entry component with id: '${route.template}'`, type: 'error' })
      return;
    }

    this.router.config.push({
      path: route.path,
      component: component.component,
      data: {
        campsiteData: route
      },
      canActivate: [CampsiteSimpleGuard]
    });
  }
}
