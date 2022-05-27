import { Component, OnInit } from '@angular/core';
import { CampsiteTemplate } from 'src/app/campsite/core/definitions/CampsiteTemplate';
import { CampsiteRouteType, ICampsiteRoute } from 'src/app/campsite/core/definitions/CampsiteRoute';
import { CampsiteDataService } from 'src/app/campsite/core/services/campsite-data.service';
import { CampsiteService } from 'src/app/campsite/core/services/campsite.service';
import { CampsiteSelectOption } from '../../components/campsite-input/ci-select/ci-select.component';

@Component({
  selector: 'app-campsite-routing-admin-page',
  templateUrl: './campsite-routing-admin-page.component.html',
  styleUrls: ['./campsite-routing-admin-page.component.scss'],
})
export class CampsiteRoutingAdminPageComponent implements OnInit {

  routes: ICampsiteRoute[] = [];
  entryTypes: CampsiteTemplate[] = [];
  routeTypes: CampsiteRouteType[] = Array.from(Object.values(CampsiteRouteType));

  templateOptions: CampsiteSelectOption[] = [];
  typeOptions: CampsiteSelectOption[] = [];
  loadOptions: CampsiteSelectOption[] = [];

  changes: any = {};

  constructor(
    private campsiteService: CampsiteService,
    private campsiteDataService: CampsiteDataService,
  ) { }

  async ngOnInit() {
    this.refresh();
  }

  async refresh() {
    await this.campsiteService.waitForInitialisation();
    this.routes = await this.campsiteDataService.getAllRoutes();
    this.entryTypes = await this.campsiteService.templates;

    this.typeOptions = this.routeTypes.map((x) => {
      return {
        label: String(x),
        value: x
      };
    })
    this.loadOptions = [
      {
        label: 'Normal',
        value: true
      },
      {
        label: 'Eager',
        value: false
      }
    ];
    this.templateOptions = this.entryTypes.map((x) => {
      return {
        label: x.name,
        value: x.id,
      }
    });

    if (this.routes.length === 0) this.addRoute();
  }

  async addRoute() {
    if (this.entryTypes.length === 0) {
      console.warn('No types of entry found!');
      return;
    }

    const routeID = this.campsiteDataService.dataProvider.generateID();
    const template = this.entryTypes.length > 0 ? this.entryTypes[0] : undefined;

    if (!template) {
      console.warn('Cant create route as there are no templates to assign.')
      return;
    }

    this.routes.push({
      path: '',
      template: template.id,
      type: CampsiteRouteType.Single,
      id: routeID,
      waitForData: true
    });
    await this.save();

    const entryID = this.campsiteDataService.dataProvider.generateID();

    await this.campsiteDataService.setEntryForSingle(entryID, {
      template: template.id,
      meta: {
        date_created: Date.now(),
        enabled: true,
        id: entryID,
        linked_route: routeID,
        title: 'Untitled Entry',
      },
      data: template.export()
    })

    console.log('Route Created');
  }

  async save() {
    const keys = Object.keys(this.changes);
    for (let index = 0; index < keys.length; index++) {
      const id = keys[index];
      await this.campsiteDataService.setRoute(this.routes.find((x) => x.id === id) as any);
      delete this.changes[id];
    }
  }

  changeMade(route: string) {
    this.changes[route] = true;
  }

  hasChanges(route?: string) {
    return route ? this.changes[route] === true : Object.keys(this.changes).length !== 0;
  }

  async removeRoute(route: ICampsiteRoute) {
    const res = confirm('Are you sure you want to delete this route?')
    if (!res) return;
    const single = await this.campsiteDataService.getRouteData(route);
    await this.campsiteDataService.removeRoute(route);
    if (single) await this.campsiteDataService.removeEntryForSingle(single?.meta.id);
    delete this.changes[route.id];
    this.refresh();
  }

  async test(route: ICampsiteRoute) {
    await this.campsiteDataService.getRouteData(route);
  }

}
