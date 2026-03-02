import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Deduplication } from './deduplication';

describe('Deduplication', () => {
  let component: Deduplication;
  let fixture: ComponentFixture<Deduplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deduplication],
    }).compileComponents();

    fixture = TestBed.createComponent(Deduplication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
