import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { CampsiteAdminService } from '../../services/campsite-admin.service';

@Component({
  selector: 'app-campsite-page-header',
  templateUrl: './campsite-page-header.component.html',
  styleUrls: ['./campsite-page-header.component.scss']
})
export class CampsitePageHeaderComponent implements OnInit {

  @Input() title: any = '';
  @Input() showCloseModal = false;

  constructor(
    private campsiteAdminService: CampsiteAdminService
  ) { }

  ngOnInit(): void {
    if (!this.title) {
      this.campsiteAdminService.getCurrentMenuItem().pipe(first()).toPromise().then((e) => this.title = e?.label)
    }
  }

  closeModal() {
    this.campsiteAdminService.closeModal();
  }
}
