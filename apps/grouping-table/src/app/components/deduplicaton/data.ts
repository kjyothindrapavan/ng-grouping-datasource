import { ILogicalSegmentDTO } from "./deduplication.interface";

// segmentRoleCd: 0 → deduplicateOrd 1–6
// segmentRoleCd: 5 → deduplicateOrd 1–6
export const LOGICAL_SEGMENTS: ILogicalSegmentDTO[] = [
    // ── segmentRoleCd: 0 ──────────────────────────────────────────────────────
    {
        name: 'Segment A',
        deduplicateInd: true,
        deduplicateOrd: 1,
        displayOrd: 1,
        logicalSegmentId: '1',
        segmentPlanId: '1',
        segmentRoleCd: 0,
        hasSplits: 1,
        logicalMandatoryRoleInd: true
    },
    {
        name: 'Segment B',
        deduplicateInd: false,
        deduplicateOrd: 2,
        displayOrd: 2,
        logicalSegmentId: '2',
        segmentPlanId: '2',
        segmentRoleCd: 0,
        hasSplits: 2,
        logicalMandatoryRoleInd: false
    },
    {
        name: 'Segment C',
        deduplicateInd: true,
        deduplicateOrd: 3,
        displayOrd: 3,
        logicalSegmentId: '3',
        segmentPlanId: '3',
        segmentRoleCd: 0,
        hasSplits: 0,
        logicalMandatoryRoleInd: true
    },
    {
        name: 'Segment D',
        deduplicateInd: false,
        deduplicateOrd: 4,
        displayOrd: 4,
        logicalSegmentId: '4',
        segmentPlanId: '4',
        segmentRoleCd: 0,
        hasSplits: 1,
        logicalMandatoryRoleInd: false
    },
    {
        name: 'Segment E',
        deduplicateInd: true,
        deduplicateOrd: 5,
        displayOrd: 5,
        logicalSegmentId: '5',
        segmentPlanId: '5',
        segmentRoleCd: 0,
        hasSplits: 3,
        logicalMandatoryRoleInd: true
    },
    {
        name: 'Segment F',
        deduplicateInd: false,
        deduplicateOrd: 6,
        displayOrd: 6,
        logicalSegmentId: '6',
        segmentPlanId: '6',
        segmentRoleCd: 0,
        hasSplits: 0,
        logicalMandatoryRoleInd: false
    },
    // ── segmentRoleCd: 5 ──────────────────────────────────────────────────────
    {
        name: 'Segment G',
        deduplicateInd: true,
        deduplicateOrd: 1,
        displayOrd: 7,
        logicalSegmentId: '7',
        segmentPlanId: '7',
        segmentRoleCd: 5,
        hasSplits: 2,
        logicalMandatoryRoleInd: true
    },
    {
        name: 'Segment H',
        deduplicateInd: false,
        deduplicateOrd: 2,
        displayOrd: 8,
        logicalSegmentId: '8',
        segmentPlanId: '8',
        segmentRoleCd: 5,
        hasSplits: 1,
        logicalMandatoryRoleInd: false
    },
    {
        name: 'Segment I',
        deduplicateInd: true,
        deduplicateOrd: 3,
        displayOrd: 9,
        logicalSegmentId: '9',
        segmentPlanId: '9',
        segmentRoleCd: 5,
        hasSplits: 0,
        logicalMandatoryRoleInd: true
    },
    {
        name: 'Segment J',
        deduplicateInd: false,
        deduplicateOrd: 4,
        displayOrd: 10,
        logicalSegmentId: '10',
        segmentPlanId: '10',
        segmentRoleCd: 5,
        hasSplits: 2,
        logicalMandatoryRoleInd: false
    },
    {
        name: 'Segment K',
        deduplicateInd: true,
        deduplicateOrd: 5,
        displayOrd: 11,
        logicalSegmentId: '11',
        segmentPlanId: '11',
        segmentRoleCd: 5,
        hasSplits: 1,
        logicalMandatoryRoleInd: true
    },
    {
        name: 'Segment L',
        deduplicateInd: false,
        deduplicateOrd: 6,
        displayOrd: 12,
        logicalSegmentId: '12',
        segmentPlanId: '12',
        segmentRoleCd: 5,
        hasSplits: 3,
        logicalMandatoryRoleInd: false
    },
]
