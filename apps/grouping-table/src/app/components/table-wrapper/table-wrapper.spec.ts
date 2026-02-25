import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableWrapper } from './table-wrapper';

describe('TableWrapper', () => {
  let component: TableWrapper;
  let fixture: ComponentFixture<TableWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableWrapper],
    }).compileComponents();

    fixture = TestBed.createComponent(TableWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
