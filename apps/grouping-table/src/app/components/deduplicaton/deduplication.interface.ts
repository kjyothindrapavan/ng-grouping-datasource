export type GroupingRow = IGroupHeaderRow | IDataRow;
export interface IGroupHeaderRow {
    _type: 'group'
    groupKey: string;
    groupValue: string | boolean | number;
    items: ILogicalSegmentDTO[]
}

export interface IDataRow {
    _type: 'data';
    data: ILogicalSegmentDTO;
    groupKey: string;
}

export interface IGroupingGroup {
    groupKey: string;
    groupValue:  boolean | string | number;
    groupLabel: string;
    items: ILogicalSegmentDTO[]
}

export function isGroupRow(_index: number, row: GroupingRow) {
    return row._type === 'group';
}

export function isDataRow(_index: number, row: GroupingRow) {
    return row._type === 'data';
}




export interface ILogicalSegmentDTO {
    name?: string | null;
    deduplicateInd?: boolean | null;
    deduplicateOrd?: number | null;
    displayOrd?: number | null;
    logicalSegmentId?: string | null;
    segmentPlanId?: string | null;
    segmentRoleCd?: number | null;
    hasSplits?: number | null;
    logicalMandatoryRoleInd?: boolean | null;
}

// export class LogicalSegmentDTO {
//     private logicalSegment: ILogicalSegmentDTO;

//     constructor(logicalSegment: ILogicalSegmentDTO) {
//         this.logicalSegment = logicalSegment;
//     }

//     get name() {
//         if(this)
//     }
//}
