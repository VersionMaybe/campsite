import { Component, OnInit } from '@angular/core';
import { CampsiteEntry } from 'src/app/campsite/core/definitions/CampsiteEntry';
import { CampsiteRouteType, ICampsiteRoute } from 'src/app/campsite/core/definitions/CampsiteRoute';
import { CampsiteDataService } from 'src/app/campsite/core/services/campsite-data.service';
import { CampsiteService } from 'src/app/campsite/core/services/campsite.service';

@Component({
  selector: 'app-campsite-entries-admin-page',
  templateUrl: './campsite-entries-admin-page.component.html',
  styleUrls: ['./campsite-entries-admin-page.component.scss'],
})
export class CampsiteEntriesAdminPageComponent implements OnInit {

  routes: ICampsiteRoute[] = [];
  entryTypes: CampsiteEntry[] = [];
  routeTypes: CampsiteRouteType[] = Array.from(Object.values(CampsiteRouteType));

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
    this.entryTypes = await this.campsiteService.entries
  }

  addRoute() {
    this.routes.push({
      entry: '',
      path: '',
      type: CampsiteRouteType.Static,
      id: String(Math.floor(Math.random() * 1000000))
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

}
