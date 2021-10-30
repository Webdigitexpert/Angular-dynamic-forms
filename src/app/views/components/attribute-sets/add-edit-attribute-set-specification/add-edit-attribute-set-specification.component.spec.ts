import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAttributeSetSpecificationComponent } from './add-edit-attribute-set-specification.component';

describe('AddEditAttributeSetSpecificationComponent', () => {
  let component: AddEditAttributeSetSpecificationComponent;
  let fixture: ComponentFixture<AddEditAttributeSetSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAttributeSetSpecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAttributeSetSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
