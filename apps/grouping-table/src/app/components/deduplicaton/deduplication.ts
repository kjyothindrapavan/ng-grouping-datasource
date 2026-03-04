import { Component, computed, effect, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LOGICAL_SEGMENTS } from './data';
import { GroupingRow, IGroupingGroup, isGroupRow, isDataRow, IGroupHeaderRow, IDataRow } from './deduplication.interface';
import { DeduplicationService } from './deduplication.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-deduplication',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './deduplication.html',
  styleUrl: './deduplication.scss',
})
export class Deduplication {
  deduplicationService = inject(DeduplicationService);
  dataSource = new MatTableDataSource<GroupingRow>([]);
  groups = this.deduplicationService.groupsSignal;
  data = LOGICAL_SEGMENTS;

  constructor() {
    this.deduplicationService.data = LOGICAL_SEGMENTS;

    effect(() => {
      this.dataSource.data = [...this.deduplicationService.tableDataSignal()];
    });
  }



  protected asGroupRow(row: GroupingRow): IGroupHeaderRow { return row as IGroupHeaderRow; }
  protected asDataRow(row: GroupingRow): IDataRow { return row as IDataRow; }

  protected readonly isGroupRow = isGroupRow;
  protected readonly isDataRow = isDataRow;

  onGroupToggle(groupKey: string) {
    this.deduplicationService.toggleGroupExpanded(groupKey);
  }

  isGroupExpanded(groupKey: string): boolean {
    return this.deduplicationService.isGroupExpanded(groupKey);
  }

  onSequenceChange(row: IDataRow, event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const numValue = parseInt(value);
    if(isNaN(numValue) || row.data.deduplicateOrd === numValue) {
      target.value = row.data.deduplicateOrd?.toString() || '';
      return;
    }
    const isSuccess = this.updateSequence(row, numValue);
    if(!isSuccess) {
      target.value = row.data.deduplicateOrd?.toString() || '';
    }
  }

     findGroup(groupKey: string): IGroupingGroup | undefined {
        return this.groups().find((group) => group.groupKey === groupKey);
    }

  private updateSequence(row: IDataRow, newIndex: number) {
    const group = this.findGroup(row.groupKey);
    if(!group) return false;
    if(newIndex < 1 || newIndex > group.items?.length) {
        return false;
    }
    const segment = row.data;
    const currentIndex = group.items.findIndex((item) => item === segment);
    if(currentIndex === -1) return false;

    const spliced = group.items.splice(currentIndex,1);
    group.items.splice(newIndex-1,0, spliced[0]);
    group.items.forEach((segment, index) => {
      segment.deduplicateOrd = index + 1;
    });

    this.deduplicationService.reGroup();
    return true;
  }
}
