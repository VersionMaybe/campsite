import { Component, OnInit } from '@angular/core';
import { CampsiteEntry } from 'src/app/campsite/core/definitions/CampsiteEntry';
import { CampsiteRouteType, ICampsiteRoute } from 'src/app/campsite/core/definitions/CampsiteRoute';
import { CampsiteDataService } from 'src/app/campsite/core/services/campsite-data.service';
import { CampsiteService } from 'src/app/campsite/core/services/campsite.service';
import { CampsiteSelectOption } from '../../components/campsite-input/ci-select/ci-select.component';

@Component({
  selector: 'app-campsite-entries-admin-page',
  templateUrl: './campsite-entries-admin-page.component.html',
  styleUrls: ['./campsite-entries-admin-page.component.scss'],
})
export class CampsiteEntriesAdminPageComponent implements OnInit {

  routes: ICampsiteRoute[] = [];
  entryTypes: CampsiteEntry[] = [];
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
    this.entryTypes = await this.campsiteService.entries;

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

  addRoute() {
    if (this.entryTypes.length === 0) {
      console.warn('No types of entry found!');
      return;
    }

    this.routes.push({
      path: '',
      entry: this.entryTypes.length > 0 ? this.entryTypes[0].id : '',
      type: CampsiteRouteType.Single,
      id: this.campsiteDataService.dataProvider.generateID(),
      waitForData: true
    });
    this.changeMade(this.routes[this.routes.length - 1].id);
  }

  async save() {
    const keys = Object.keys(this.changes);
    for (let index = 0; index < keys.length; index++) {
      const id = keys[index];
      await this.campsiteDataService.setRoute(this.routes.find((x) => x.id === id) as any);
      delete this.changes[id];
    }
    console.log('Done', this.changes);
  }

  changeMade(route: string) {
    this.changes[route] = true;
  }

  hasChanges(route?: string) {
    return route ? this.changes[route] === true : Object.keys(this.changes).length !== 0;
  }

  async removeRoute(route: ICampsiteRoute) {
    await this.campsiteDataService.removeRoute(route);
    delete this.changes[route.id];
    this.refresh();
  }

  async test(route: ICampsiteRoute) {
    await this.campsiteDataService.getRouteData(route);
  }

}
