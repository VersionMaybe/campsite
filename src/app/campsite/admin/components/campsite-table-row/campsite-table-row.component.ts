import { Component, OnInit } from '@angular/core';

export enum CampsiteRowType {
  Regular = 'normal',
  Header = 'header'
}

@Component({
  selector: 'app-campsite-table-row',
  templateUrl: './campsite-table-row.component.html',
  styleUrls: ['./campsite-table-row.component.scss']
})
export class CampsiteTableRowComponent implements OnInit {

  type: CampsiteRowType = CampsiteRowType.Regular;

  constructor() { }

  ngOnInit(): void {
  }

}
