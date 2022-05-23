import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiSelectComponent } from './ci-select.component';

describe('CiSelectComponent', () => {
  let component: CiSelectComponent;
  let fixture: ComponentFixture<CiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
