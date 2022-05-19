import { Component, OnInit } from '@angular/core';
import { ICampsiteRoute } from 'src/app/campsite/core/definitions/CampsiteRoute';
import { CampsiteDataService } from 'src/app/campsite/core/services/campsite-data.service';
import { CampsiteService } from 'src/app/campsite/core/services/campsite.service';

@Component({
  selector: 'app-campsite-entries-admin-page',
  templateUrl: './campsite-entries-admin-page.component.html',
  styleUrls: ['./campsite-entries-admin-page.component.scss']
})
export class CampsiteEntriesAdminPageComponent implements OnInit {

  routes: ICampsiteRoute[] = [];

  constructor(
    private campsiteService: CampsiteService,
    private campsiteDataService: CampsiteDataService,
  ) { }

  async ngOnInit() {
    await this.campsiteService.waitForInitialisation();
    this.routes = this.campsiteService.routes;
    console.log('Campsite Ready', this.campsiteService.routes)
    console.log(await this.campsiteDataService.getAllEntries());
  }

}
