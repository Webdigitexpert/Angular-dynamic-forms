import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCitysComponent } from './add-edit-citys.component';

describe('AddEditCitysComponent', () => {
  let component: AddEditCitysComponent;
  let fixture: ComponentFixture<AddEditCitysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCitysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCitysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
