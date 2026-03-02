import { MatTableDataSource } from "@angular/material/table";
import { IGroupingItem, IGroupingTableConfig } from "../interfaces/grouping-table.interface";
import { BehaviorSubject, Observable } from "rxjs";

export class GroupingDataSource<T extends IGroupingItem<Record<string, any>>> extends MatTableDataSource<T> {
    // private data!: Observable<T[]>;
    private defaultKey!: string;
    constructor(config: IGroupingTableConfig) {
        super();
        const data = config.dataProvider();
    }
}