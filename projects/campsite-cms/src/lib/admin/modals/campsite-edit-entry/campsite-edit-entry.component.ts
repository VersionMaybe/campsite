import { Component, Input, OnInit } from '@angular/core';
import { CampsiteBlock } from '../../../core/definitions/CampsiteBlock';
import { ICampsiteEntry } from '../../../core/definitions/CampsiteEntry';
import { ICampsiteRoute } from '../../../core/definitions/CampsiteRoute';
import { CampsiteDataService } from '../../../core/services/campsite-data.service';
import { CampsiteService } from '../../../core/services/campsite.service';
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
  template: any;

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
    this.template = template;
    Object.keys(template.blocks).forEach((e) => {
      const construct = (Object.getPrototypeOf(template.blocks[e]).constructor);
      const block: CampsiteBlock = (new construct).label(template.blocks[e].name);
      block.set(this.entry.data[e]);
      this.blocks.push(block);
    });
  }

  save() {
    console.log(this.entry.data)
    try {
      Object.keys(this.template.blocks).forEach((e, i) => {
        console.log(e, i, this.blocks[i].export());
        this.entry.data[e] = this.blocks[i].export();
      });
    } catch { }

    console.log(this.blocks, this.entry);

    this.campsiteDataService.setEntryForSingle(this.entry.meta.id, this.entry);
    this.campsiteAdminService.closeModal();
  }

}
