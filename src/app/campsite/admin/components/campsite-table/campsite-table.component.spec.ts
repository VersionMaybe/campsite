import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampsiteTableComponent } from './campsite-table.component';

describe('CampsiteTableComponent', () => {
  let component: CampsiteTableComponent;
  let fixture: ComponentFixture<CampsiteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampsiteTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampsiteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
