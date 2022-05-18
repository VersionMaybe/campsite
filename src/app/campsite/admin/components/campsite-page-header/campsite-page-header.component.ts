import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { CampsiteAdminService } from '../../services/campsite-admin.service';

@Component({
  selector: 'app-campsite-page-header',
  templateUrl: './campsite-page-header.component.html',
  styleUrls: ['./campsite-page-header.component.scss']
})
export class CampsitePageHeaderComponent implements OnInit {

  title: any = '';

  constructor(
    private campsiteAdminService: CampsiteAdminService
  ) { }

  ngOnInit(): void {
    this.campsiteAdminService.getCurrentMenuItem().pipe(first()).toPromise().then((e) => this.title = e?.label)
  }
}
