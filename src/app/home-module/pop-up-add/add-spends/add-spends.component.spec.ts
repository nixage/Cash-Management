import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpendsComponent } from './add-spends.component';

describe('AddSpendsComponent', () => {
  let component: AddSpendsComponent;
  let fixture: ComponentFixture<AddSpendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
