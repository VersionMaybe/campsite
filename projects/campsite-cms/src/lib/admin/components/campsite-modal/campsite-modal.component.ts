import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CampsiteAdminService } from '../../services/campsite-admin.service';

@Component({
  selector: 'app-campsite-modal',
  templateUrl: './campsite-modal.component.html',
  styleUrls: ['./campsite-modal.component.scss']
})
export class CampsiteModalComponent implements OnInit {

  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;

  show = false;

  constructor(
    private campsiteAdminService: CampsiteAdminService
  ) { }

  ngOnInit(): void {
    this.campsiteAdminService.listenForModals().subscribe((e) => {
      if (e) {
        this.loadModal(e.component, e.data)
      } else {
        this.show = false;
      }

      if (!e) {
        setTimeout(() => {
          this.vc.clear();
        }, 300);
      }
    });
  }

  loadModal(component: any, data: any) {
    this.vc.clear();
    const comp = this.vc.createComponent(component);

    Object.keys(data).forEach((e) => {
      (comp.instance as any)[e] = data[e];
    });

    setTimeout(() => {
      this.show = true;
    }, 50);
  }

}
