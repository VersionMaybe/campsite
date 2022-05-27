import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-campsite-page-header',
  templateUrl: './campsite-page-header.component.html',
  styleUrls: ['./campsite-page-header.component.scss']
})
export class CampsitePageHeaderComponent implements OnInit {

  @Input() title: any = '';
  @Input() showCloseModal = false;

  constructor() { }

  ngOnInit(): void { }

  // this.campsiteAdminService.getCurrentMenuItem().pipe(first()).toPromise().then((e) => this.title = e?.label)
}
