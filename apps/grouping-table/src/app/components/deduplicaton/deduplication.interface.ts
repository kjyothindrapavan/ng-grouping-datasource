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
    name?: string;
    deduplicateInd?: boolean;
    deduplicateOrd?: number;
    displayOrd?: number;
    logicalSegmentId?: string;
    segmentPlanId?: string;
    segmentRoleCd?: number;
    hasSplits?: number;
    logicalMandatoryRoleInd?: boolean;
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
