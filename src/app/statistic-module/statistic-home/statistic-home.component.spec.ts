import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticHomeComponent } from './statistic-home.component';

describe('StatisticHomeComponent', () => {
  let component: StatisticHomeComponent;
  let fixture: ComponentFixture<StatisticHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
