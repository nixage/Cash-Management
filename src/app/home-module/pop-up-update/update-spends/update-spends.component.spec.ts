import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpendsComponent } from './update-spends.component';

describe('UpdateSpendsComponent', () => {
  let component: UpdateSpendsComponent;
  let fixture: ComponentFixture<UpdateSpendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSpendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
