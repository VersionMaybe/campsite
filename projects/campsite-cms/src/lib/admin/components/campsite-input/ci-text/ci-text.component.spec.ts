import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiTextComponent } from './ci-text.component';

describe('CiTextComponent', () => {
  let component: CiTextComponent;
  let fixture: ComponentFixture<CiTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
