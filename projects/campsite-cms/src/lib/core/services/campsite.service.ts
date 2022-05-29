import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CampsiteBlock } from '../definitions/CampsiteBlock';
import { CampsiteTemplate } from '../definitions/CampsiteTemplate';
import { CampsiteField } from '../definitions/CampsiteField';
import { ICampsiteRoute } from '../definitions/CampsiteRoute';
import { ICampsiteLog } from '../definitions/CampsiteLog';
import { NumberField } from '../fields/number-fields';
import { ParagraphField } from '../fields/paragraph-field';
import { UrlField } from '../fields/url-field';
import { CampsiteDataService } from './campsite-data.service';
import { ReplaySubject } from 'rxjs';
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
    CampsiteConfig.initialised.next(true);
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
