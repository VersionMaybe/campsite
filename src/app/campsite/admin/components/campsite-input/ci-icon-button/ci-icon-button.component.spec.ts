import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiIconButtonComponent } from './ci-icon-button.component';

describe('CiIconButtonComponent', () => {
  let component: CiIconButtonComponent;
  let fixture: ComponentFixture<CiIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiIconButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
