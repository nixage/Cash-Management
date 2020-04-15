import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSavingsComponent } from './update-savings.component';

describe('UpdateSavingsComponent', () => {
  let component: UpdateSavingsComponent;
  let fixture: ComponentFixture<UpdateSavingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSavingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
