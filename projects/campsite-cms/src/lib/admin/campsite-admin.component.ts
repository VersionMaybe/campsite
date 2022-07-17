import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { debounceTime, ReplaySubject, Subscription } from 'rxjs';
import { ICampsiteUser } from '../core/definitions/CampsiteUser';
import { CampsiteDataService } from '../core/services/campsite-data.service';
import { IAdminItem } from './definitions/IAdminItem';
import { CampsiteAdminService } from './services/campsite-admin.service';



@Component({
  selector: 'app-campsite-admin',
  templateUrl: './campsite-admin.component.html',
  styleUrls: ['./campsite-admin.component.scss']
})
export class CampsiteAdminComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;

  user: ICampsiteUser | undefined;

  closed = false;

  selectedItem: IAdminItem | undefined;
  selectedItemSub!: Subscription;

  loadPage = new ReplaySubject<IAdminItem | undefined>(1);
  loadPageSub!: Subscription;

  constructor(
    private campsiteAdminService: CampsiteAdminService,
    private campsiteDataService: CampsiteDataService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Campsite (Admin)')
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
    this.title.setTitle('Campsite (Admin)' + (page ? ` - ${page?.label}` : ''))
  }
  
  createMenuContent(page: IAdminItem | undefined) {
    if (!this.user) return;
    this.vc.clear();
    this.selectedItem = page;
    if (!page || !page.component) return;
    this.vc.createComponent(page.component);
  }

  async login() {
    this.user = await this.campsiteDataService.dataProvider.login();
  }
}
