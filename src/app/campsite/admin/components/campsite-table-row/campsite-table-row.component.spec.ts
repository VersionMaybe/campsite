import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampsiteTableRowComponent } from './campsite-table-row.component';

describe('CampsiteTableRowComponent', () => {
  let component: CampsiteTableRowComponent;
  let fixture: ComponentFixture<CampsiteTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampsiteTableRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampsiteTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
