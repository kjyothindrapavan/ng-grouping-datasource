import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { LOGICAL_SEGMENTS } from './data';
import { GroupingRow, IGroupingGroup, isGroupRow, isDataRow, IGroupHeaderRow, IDataRow } from './deduplication.interface';
import { DeduplicationService } from './deduplication.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-deduplication',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './deduplication.html',
  styleUrl: './deduplication.scss',
  animations: [
    trigger('rowExpand', [
      state('collapsed', style({ display: 'none'})),
      state('expanded', style({ display: 'block'})),
      transition('expanded <=> collapsed', animate('1000ms ease')),
    ]),
  ],
})
export class Deduplication {
  deduplicationService = inject(DeduplicationService);
  dataSource!: GroupingRow[];
  groups!: IGroupingGroup[];

  constructor() {
    this.deduplicationService.data = LOGICAL_SEGMENTS;
    this.updateTableData();
  }

  protected asGroupRow(row: GroupingRow): IGroupHeaderRow { return row as IGroupHeaderRow; }
  protected asDataRow(row: GroupingRow): IDataRow { return row as IDataRow; }

  protected readonly isGroupRow = isGroupRow;
  protected readonly isDataRow = isDataRow;

  onGroupToggle(groupKey: string) {
    this.deduplicationService.onToggle(groupKey);
  }

  isGroupExpanded(groupKey: string): boolean {
    return this.deduplicationService.isGroupExpanded(groupKey);
  }

  getRowAnimState(row: GroupingRow): 'expanded' | 'collapsed' {
    return this.deduplicationService.isGroupExpanded(this.asDataRow(row).groupKey)
      ? 'expanded'
      : 'collapsed';
  }

  private updateTableData() {
    const { rows, groups } = this.deduplicationService.buildFlatRows();
    this.dataSource = rows;
    this.groups = groups;
  }
}
