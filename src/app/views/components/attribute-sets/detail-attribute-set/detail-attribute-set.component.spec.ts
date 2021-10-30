import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAttributeSetComponent } from './detail-attribute-set.component';

describe('DetailAttributeSetComponent', () => {
  let component: DetailAttributeSetComponent;
  let fixture: ComponentFixture<DetailAttributeSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAttributeSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAttributeSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
