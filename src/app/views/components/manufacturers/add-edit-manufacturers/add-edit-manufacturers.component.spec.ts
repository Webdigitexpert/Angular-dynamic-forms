import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditManufacturersComponent } from './add-edit-manufacturers.component';

describe('AddEditManufacturersComponent', () => {
  let component: AddEditManufacturersComponent;
  let fixture: ComponentFixture<AddEditManufacturersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditManufacturersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
