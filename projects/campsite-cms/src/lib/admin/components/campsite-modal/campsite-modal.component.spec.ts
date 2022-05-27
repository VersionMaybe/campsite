import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampsiteModalComponent } from './campsite-modal.component';

describe('CampsiteModalComponent', () => {
  let component: CampsiteModalComponent;
  let fixture: ComponentFixture<CampsiteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampsiteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampsiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
