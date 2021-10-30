import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDomainComponent } from './add-edit-domain.component';

describe('AddEditDomainComponent', () => {
  let component: AddEditDomainComponent;
  let fixture: ComponentFixture<AddEditDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDomainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
