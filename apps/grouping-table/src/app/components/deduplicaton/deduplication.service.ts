import { GroupingRow, IGroupHeaderRow, IGroupingGroup, ILogicalSegmentDTO } from "./deduplication.interface";
import { Injectable, signal, effect } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DeduplicationService {

    private dataSignal = signal<ILogicalSegmentDTO[]>([]);
    private groupBySignal = signal<'name' | 'segmentRoleCd' | 'deduplicateInd'>('segmentRoleCd');

    expandedGroups = signal<Set<string>>(new Set());

    // dummy = effect(() => {

    //     const rows = this.expandedGroups();
    //     this.buildFlatRows();
    // });

    buildFlatRows()
    : {rows: GroupingRow[]; groups: IGroupingGroup[]} {
        const map = new Map<boolean | number | string, ILogicalSegmentDTO[]>();
        this.dataSignal().forEach((row) => {
            const val = row[this.groupBySignal()] as 'string' | 'number' | 'boolean';
            if(!map.has(val)) map.set(val, []);
            map.get(val)?.push(row);
        });

        const groups: IGroupingGroup[] = [];
        const rows: GroupingRow[] = [];

        map.forEach((segments, gk) => {
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
                segments.forEach((segment) => {
                rows.push({
                    _type: 'data',
                    data: segment,
                    groupKey: groupKey
                });
            });
            // }
        });

        return {rows, groups};
    }

    private findUniqueKeys(data: ILogicalSegmentDTO[], key: string): Set<string> {
        const uniqueKeys = new Set<string>();
        data.forEach((segment) => {
            uniqueKeys.add(segment[key as keyof ILogicalSegmentDTO] as string);
        });
        return uniqueKeys;
    }

    onToggle(groupKey: string) {
        const s = new Set(this.expandedGroups());
        if(s.has(groupKey)) {
            s.delete(groupKey);
        } else {
            s.add(groupKey);
        }

        this.expandedGroups.set(s);

        // this.expandedGroups.update(expandedRows => {
        //     console.log("Expand called");
        //     if(expandedRows.has(groupKey)) {
        //         expandedRows.delete(groupKey);
        //     } else {
        //         expandedRows.add(groupKey);
        //     }
        //     return expandedRows;
        // })
    }

    isGroupExpanded(groupKey: string): boolean {
        return this.expandedGroups().has(groupKey);
    }

    set data(data: ILogicalSegmentDTO[]) {
        this.dataSignal.set(data);
    }

    set groupBy(groupVal: 'name' | 'segmentRoleCd' | 'deduplicateInd') {
        this.groupBySignal.set(groupVal);
    }
}