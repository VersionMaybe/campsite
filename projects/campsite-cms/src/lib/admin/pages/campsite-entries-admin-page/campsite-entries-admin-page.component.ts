import { Component, OnInit } from '@angular/core';
import { ICampsiteEntry } from '../../../core/definitions/CampsiteEntry';
import { CampsiteRouteType, ICampsiteRoute } from '../../../core/definitions/CampsiteRoute';
import { CampsiteDataService } from '../../../core/services/campsite-data.service';
import { CampsiteService } from '../../../core/services/campsite.service';
import { CampsiteSelectOption } from '../../components/campsite-input/ci-select/ci-select.component';
import { CampsiteEditEntryComponent } from '../../modals/campsite-edit-entry/campsite-edit-entry.component';
import { CampsiteAdminService } from '../../services/campsite-admin.service';

@Component({
  selector: 'app-campsite-entries-admin-page',
  templateUrl: './campsite-entries-admin-page.component.html',
  styleUrls: ['./campsite-entries-admin-page.component.scss']
})
export class CampsiteEntriesAdminPageComponent implements OnInit {

  entries: ICampsiteEntry<any>[] = [];
  entryStatus: CampsiteSelectOption[] = [
    {
      label: 'Enabled',
      value: true
    },
    {
      label: 'Disabled',
      value: false
    }
  ];
  routeLinks: { [key: string]: ICampsiteRoute } = {};

  constructor(
    private campsiteAdminService: CampsiteAdminService,
    private campsiteDataService: CampsiteDataService,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  async refresh() {
    this.routeLinks = {};
    const routes = await this.campsiteDataService.getAllRoutes();
    this.entries = await this.campsiteDataService.getAllEntries();

    this.entries.forEach((entry, i) => {
      const route = routes.find((x) => x.id === entry.meta.linked_route);
      this.routeLinks[i] = route || {
        id: '',
        path: 'Unset',
        template: '',
        type: CampsiteRouteType.Single
      };
    });
  }

  removeEntry(entry: ICampsiteEntry<any>) {
    console.log('Delete me please!', entry)
  }

  editEntry(entry: ICampsiteEntry<any>) {
    this.campsiteAdminService.openModal(CampsiteEditEntryComponent, {
      entry,
      route: this.routeLinks[this.entries.findIndex((x) => x === entry)]
    });
  }

  async test() {
    this.campsiteDataService.download(
      'export.campsite',
      await this.campsiteDataService.exportCampsite()
    );
  }

  addEntry() {
    // const id = this.campsiteDataService.dataProvider.generateID();
    // const template = this.campsiteService.templates.length > 0 ? this.campsiteService.templates[0] : undefined;
    // console.log(template?.export())
    // this.campsiteDataService.setEntryForSingle(id, {
    //   template: template?.id || '',
    //   meta: {
    //     date_created: Date.now(),
    //     enabled: true,
    //     id: id,
    //     linked_route: null as any,
    //     title: 'New Entry ' + (this.entries.length + 1),
    //   },
    //   data: template?.export() || undefined
    // })
  }

  async importData() {
    const files = await this.campsiteDataService.selectFile('*.campsite');
    console.log(files);
    if (files.length > 0) {
      this.campsiteDataService.importCampsite(files[0]);
    }
  }

}
