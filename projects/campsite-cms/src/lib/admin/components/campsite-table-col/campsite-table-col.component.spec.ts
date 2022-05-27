import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampsiteTableColComponent } from './campsite-table-col.component';

describe('CampsiteTableColComponent', () => {
  let component: CampsiteTableColComponent;
  let fixture: ComponentFixture<CampsiteTableColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampsiteTableColComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampsiteTableColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
