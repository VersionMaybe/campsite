import { AfterViewInit, Component, ComponentFactory, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { debounceTime, ReplaySubject, Subject, Subscription } from 'rxjs';
import { IAdminItem } from './definitions/IAdminItem';
import { CampsiteAdminService } from './services/campsite-admin.service';



@Component({
  selector: 'app-campsite-admin',
  templateUrl: './campsite-admin.component.html',
  styleUrls: ['./campsite-admin.component.scss']
})
export class CampsiteAdminComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;

  closed = false;

  selectedItem: IAdminItem | undefined;
  selectedItemSub!: Subscription;

  loadPage = new ReplaySubject<IAdminItem | undefined>(1);
  loadPageSub!: Subscription;

  constructor(
    private campsiteAdminService: CampsiteAdminService
  ) { }

  ngOnInit(): void {
    this.selectedItemSub = this.campsiteAdminService.getCurrentMenuItem().subscribe((e) => {
      if (this.selectedItem?.id !== e?.id || !this.selectedItem) this.onMenuChanged(e);
    });
  }

  ngOnDestroy() {
    if (this.selectedItemSub) { this.selectedItemSub.unsubscribe(); }
    if (this.loadPageSub) { this.loadPageSub.unsubscribe(); }
  }

  ngAfterViewInit() {
    this.loadPageSub = this.loadPage.pipe(debounceTime(50)).subscribe((e) => this.createMenuContent(e));
  }

  onMenuChanged(page: IAdminItem | undefined) {
    this.loadPage.next(page);
  }

  createMenuContent(page: IAdminItem | undefined) {
    this.vc.clear();
    this.selectedItem = page;
    if (!page || !page.component) return;
    this.vc.createComponent(page.component);
  }
}
