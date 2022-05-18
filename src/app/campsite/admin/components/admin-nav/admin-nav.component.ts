import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAdminItem } from '../../definitions/IAdminItem';
import { CampsiteAdminService } from '../../services/campsite-admin.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit, OnDestroy {

  @Input() closed = false;

  items: IAdminItem[] = [];
  selectedItem: IAdminItem | undefined;

  itemsSub!: Subscription;
  selectedItemSub!: Subscription;

  constructor(
    private campsiteAdminService: CampsiteAdminService
  ) { }

  ngOnInit(): void {
    this.itemsSub = this.campsiteAdminService.getMenuItems().subscribe((e) => this.items = e);
    this.selectedItemSub = this.campsiteAdminService.getCurrentMenuItem().subscribe((e) => this.selectedItem = e);
  }

  ngOnDestroy() {
    if (this.itemsSub) { this.itemsSub.unsubscribe(); }
    if (this.selectedItemSub) { this.selectedItemSub.unsubscribe(); }
  }

  select(item: IAdminItem) {
    this.campsiteAdminService.navigate(item);
  }

}
