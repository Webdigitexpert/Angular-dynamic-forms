import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAttributeSetsComponent } from './add-edit-attribute-sets.component';

describe('AddEditAttributeSetsComponent', () => {
  let component: AddEditAttributeSetsComponent;
  let fixture: ComponentFixture<AddEditAttributeSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAttributeSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAttributeSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
