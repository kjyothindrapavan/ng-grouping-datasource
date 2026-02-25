import { Component, input, OnInit } from '@angular/core';
import { IGroupingItem, IGroupingTableColumnConfig } from '../../interfaces/grouping-table.interface';
import { MatTable, MatTableModule } from "@angular/material/table";

@Component({
  selector: 'app-grouping-row',
  imports: [MatTableModule],
  templateUrl: './grouping-row.html',
  styleUrl: './grouping-row.scss',
})
export class GroupingRow<T extends Record<string, any>> implements OnInit{
  columns = input<IGroupingTableColumnConfig[]>();
  data = input<IGroupingItem<T>[]>([]);
  displayedColumns!: string[];

  ngOnInit() {
    this.displayedColumns = this.columns()?.map(col => col.key) ?? [];
    
  }
}
