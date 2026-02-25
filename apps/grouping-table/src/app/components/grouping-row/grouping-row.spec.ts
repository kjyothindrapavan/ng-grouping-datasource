import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupingRow } from './grouping-row';

describe('GroupingRow', () => {
  let component: GroupingRow;
  let fixture: ComponentFixture<GroupingRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupingRow],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupingRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
