import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampsiteEditEntryComponent } from './campsite-edit-entry.component';

describe('CampsiteEditEntryComponent', () => {
  let component: CampsiteEditEntryComponent;
  let fixture: ComponentFixture<CampsiteEditEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampsiteEditEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampsiteEditEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
