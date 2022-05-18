import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampsitePageHeaderComponent } from './campsite-page-header.component';

describe('CampsitePageHeaderComponent', () => {
  let component: CampsitePageHeaderComponent;
  let fixture: ComponentFixture<CampsitePageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampsitePageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampsitePageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
