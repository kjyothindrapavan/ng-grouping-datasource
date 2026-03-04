import { BehaviorSubject } from "rxjs";
import { GroupingRow, IDataRow, IGroupHeaderRow, IGroupingGroup, ILogicalSegmentDTO } from './deduplication.interface';
import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DeduplicationService {

    // private dataSignal = signal<ILogicalSegmentDTO[]>([]);
    private groupBySignal = signal<'name' | 'segmentRoleCd' | 'deduplicateInd'>('segmentRoleCd');

    private sortDataBy = signal<'deduplicateOrd'>('deduplicateOrd');

    expandedGroups = signal<Set<string>>(new Set());

    private originalData!: ILogicalSegmentDTO[];

    private tableDataBS = new BehaviorSubject<GroupingRow[]>([]);
    private groupsBs = new BehaviorSubject<IGroupingGroup[]>([]);

    tableData$ = this.tableDataBS.asObservable();
    groups$ = this.groupsBs.asObservable();

    tableDataSignal = signal<GroupingRow[]>([]);
    groupsSignal = signal<IGroupingGroup[]>([]);




    private buildFlatRows(data: ILogicalSegmentDTO[])
    : {rows: GroupingRow[]; groups: IGroupingGroup[]} {
        const map = new Map<boolean | number | string, ILogicalSegmentDTO[]>();
        data.forEach((row) => {
            const val = row[this.groupBySignal()] as 'string' | 'number' | 'boolean';
            if(!map.has(val)) map.set(val, []);
            map.get(val)?.push(row);
        });

        const groups: IGroupingGroup[] = [];
        const rows: GroupingRow[] = [];

        const sortedGroups: {key: boolean | string | number; segments: ILogicalSegmentDTO[]}[] = this.sortGroups(map);

        sortedGroups.forEach((group) => {
            const gk = group.key;
            const segments = group.segments;
            const groupKey = `${this.groupBySignal()}__${gk}`;
            groups.push({
                groupKey: groupKey,
                groupValue: gk,
                groupLabel: `${gk}`,
                items: segments,

            });
            const header: IGroupHeaderRow = {
                _type: 'group',
                groupKey: groupKey,
                groupValue: gk,
                items: segments
            }
            rows.push(header);
            // if(this.expandedGroups().has(groupKey)) {
                segments.sort((a,b) => a[this.sortDataBy()]! - b[this.sortDataBy()]!);
                segments.forEach((segment) => {
                rows.push({
                    _type: 'data',
                    data: segment,
                    groupKey: groupKey,
                });
            });
            // }
        });

        return {rows, groups};
    }

    private sortGroups(groupsMap: Map<boolean | number | string, ILogicalSegmentDTO[]>) {
        const groups: {key: boolean | string | number; segments: ILogicalSegmentDTO[]}[] = [];
        groupsMap.forEach((items, gk) => {
            groups.push({key: gk, segments: items});
        });

        groups.sort((a,b) => {
            if(typeof(a.key) === 'string') {
                return a.key.localeCompare(b.key as string, undefined, {sensitivity: 'base'});
            }
            return a.key ? 0 : 1;
        });

        return groups;
    }

    toggleGroupExpanded(groupKey: string) {
        const s = new Set(this.expandedGroups());
        if(s.has(groupKey)) {
            s.delete(groupKey);
        } else {
            s.add(groupKey);
        }

        this.expandedGroups.set(s);
        // this.updateTableData();
    }

    private filterData(data: ILogicalSegmentDTO[]): ILogicalSegmentDTO[] {
        const filteredData = data.filter(segment => segment.segmentRoleCd === 0 || segment.segmentRoleCd === 5);
        return filteredData;
    }

    isGroupExpanded(groupKey: string): boolean {
        return this.expandedGroups().has(groupKey);
    }

    set data(data: ILogicalSegmentDTO[]) {
        // this.dataSignal.set(data); revisit
        this.originalData = data;
        this.updateTableData();
    }

    set groupBy(groupVal: 'name' | 'segmentRoleCd' | 'deduplicateInd') {
        this.groupBySignal.set(groupVal);
        this.updateTableData();
    }

    private updateTableData() {
        const filteredData = this.filterData(this.originalData);
        const {rows, groups} = this.buildFlatRows(filteredData);
        // this.tableDataBS.next(rows);
        // this.groupsBs.next(groups);

        this.tableDataSignal.set(rows);
        this.groupsSignal.set(groups);
    }

    findGroup(groupKey: string): IGroupingGroup | undefined {
        return this.groupsSignal().find((group) => group.groupKey === groupKey);
    }

    reGroup() {
        this.updateTableData();
    }
}
