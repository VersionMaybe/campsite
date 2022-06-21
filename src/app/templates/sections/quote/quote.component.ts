import { Component, Input, OnInit } from '@angular/core';
import { QuoteBlock, ICampsiteBlockData } from 'cmapsite-cms';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  @Input() data!: ICampsiteBlockData<QuoteBlock>;

  constructor() { }

  ngOnInit(): void {
  }

}
