import { Component, Input, OnInit } from '@angular/core';
import { CampsiteBlock } from 'src/app/campsite/core/definitions/CampsiteBlock';
import { ICampsiteEntry } from 'src/app/campsite/core/definitions/CampsiteEntry';
import { ICampsiteRoute } from 'src/app/campsite/core/definitions/CampsiteRoute';
import { CampsiteDataService } from 'src/app/campsite/core/services/campsite-data.service';
import { CampsiteService } from 'src/app/campsite/core/services/campsite.service';
import { CampsiteSelectOption } from '../../components/campsite-input/ci-select/ci-select.component';
import { CampsiteAdminService } from '../../services/campsite-admin.service';

@Component({
  selector: 'app-campsite-edit-entry',
  templateUrl: './campsite-edit-entry.component.html',
  styleUrls: ['./campsite-edit-entry.component.scss']
})
export class CampsiteEditEntryComponent implements OnInit {

  loading = true;

  @Input() entry!: ICampsiteEntry<any>;
  @Input() route!: ICampsiteRoute;

  @Input() routeOptions: CampsiteSelectOption[] = [];
  statusOptions: CampsiteSelectOption[] = [
    {
      label: 'Enabled',
      value: true
    },
    {
      label: 'Disabled',
      value: false
    }
  ];
  blocks: CampsiteBlock[] = [];

  constructor(
    private campsiteDataService: CampsiteDataService,
    private campsiteAdminService: CampsiteAdminService,
    private campsiteService: CampsiteService,
  ) { }

  async ngOnInit() {
    const routes = await this.campsiteDataService.getAllRoutes();
    this.routeOptions = routes.map((x) => {
      return {
        label: x.path,
        value: x.id
      }
    });

    const template = this.campsiteService.templates.find((x) => x.id === this.route.template);
    if (!template) return;
    Object.keys(template.blocks).forEach((e) => {
      const block: CampsiteBlock = new (Object.getPrototypeOf(template.blocks[e]).constructor);
      block.set(this.entry.data[e]);
      this.blocks.push(block);

    });

    console.log(this.blocks);
  }

  save() {
    Object.keys(this.entry.data).forEach((e, i) => {
      this.entry.data[e] = this.blocks[i].export()
    });

    this.campsiteDataService.setDataForSingle(this.entry.meta.id, this.entry);
    this.campsiteAdminService.closeModal();
  }

}
