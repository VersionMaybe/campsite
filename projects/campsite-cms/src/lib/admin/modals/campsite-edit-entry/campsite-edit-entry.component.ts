import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CampsiteBlock } from '../../../core/definitions/CampsiteBlock';
import { ICampsiteEntry } from '../../../core/definitions/CampsiteEntry';
import { ICampsiteRoute } from '../../../core/definitions/CampsiteRoute';
import { CampsiteDataService } from '../../../core/services/campsite-data.service';
import { CampsiteService } from '../../../core/services/campsite.service';
import { SaveUtil } from '../../../core/utils/save.util';
import { CampsiteSelectOption } from '../../components/campsite-input/ci-select/ci-select.component';
import { CampsiteAdminService } from '../../services/campsite-admin.service';

@Component({
  selector: 'app-campsite-edit-entry',
  templateUrl: './campsite-edit-entry.component.html',
  styleUrls: ['./campsite-edit-entry.component.scss']
})
export class CampsiteEditEntryComponent implements OnInit, OnDestroy {

  loading = true;
  onSave = '';

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
    private campsiteService: CampsiteService
  ) { }

  ngOnInit() {
    this.refresh();
    this.onSave = SaveUtil.onSave(() => this.save(false));
  }

  ngOnDestroy() {
    SaveUtil.removeListener(this.onSave);
  }

  async refresh() {
    this.loading = true;
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
    this.blocks = [];
    Object.keys(template.blocks).forEach((e) => {
      const construct = (Object.getPrototypeOf(template.blocks[e]).constructor);
      const block: CampsiteBlock = (new construct).label(template.blocks[e].name);
      block.set(this.entry.data[e]);
      this.blocks.push(block);
    });
    this.loading = false;
  }

  async save(close?: boolean) {
    this.loading = true;
    try {
      Object.keys(this.template.blocks).forEach((e, i) => {
        this.entry.data[e] = this.blocks[i].export();
      });
    } catch { }

    await this.campsiteDataService.setEntryForSingle(this.entry.meta.id, this.entry);
    if (close) {
      this.campsiteAdminService.closeModal();
      this.loading = false;
    } else {
      await this.refresh();
    }
  }
}
