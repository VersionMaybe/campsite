import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockRenderComponent } from './block-render.component';

describe('BlockRenderComponent', () => {
  let component: BlockRenderComponent;
  let fixture: ComponentFixture<BlockRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
