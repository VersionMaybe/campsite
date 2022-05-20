import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { CampsiteModule } from '../../core/campsite.module';
import { CampsiteService } from '../../core/services/campsite.service';
import { IAdminItem } from '../definitions/IAdminItem';

@Injectable({
  providedIn: 'root'
})
export class CampsiteAdminService {

  private navigationItems = new BehaviorSubject<IAdminItem[]>((CampsiteModule.adminExtensions || []));
  private currentNavItem = new BehaviorSubject<IAdminItem | undefined>(undefined);

  constructor(
    private router: Router,
    private campsiteService: CampsiteService
  ) { this.listenForNavigation(); }

  listenForNavigation() {
    this.router.events.pipe(filter(x => x instanceof NavigationEnd)).subscribe((e) => {
      const data = e as NavigationEnd;
      const page = this.navigationItems.value.find((x) => data.url.replace('/admin/', '').startsWith(x.id));
      if (!page && this.navigationItems.value.length > 0) {
        this.navigate(this.navigationItems.value[0]);
      } else {
        this.currentNavItem.next(page);
      }
    });
  }

  getMenuItems() {
    return this.navigationItems.asObservable();
  }

  getCurrentMenuItem() {
    return this.currentNavItem.asObservable();
  }

  addMenuItems(items: IAdminItem[]) {
    this.navigationItems.next([
      ...this.navigationItems.value,
      ...items
    ]);
  }

  navigate(item: IAdminItem) {
    this.router.navigate([`admin/${item.id}`]);
  }
}
