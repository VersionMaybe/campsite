import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampsiteEntriesAdminPageComponent } from './campsite-entries-admin-page.component';

describe('CampsiteEntriesAdminPageComponent', () => {
  let component: CampsiteEntriesAdminPageComponent;
  let fixture: ComponentFixture<CampsiteEntriesAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampsiteEntriesAdminPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampsiteEntriesAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
