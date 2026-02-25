import { Observable } from 'rxjs';

export interface IGroupingTableConfig {
    columns: IGroupingTableColumnConfig[];
    dataProvider: <T extends Record<string, any>>() => Observable<IGroupingItem<T>[]>;
    defaultColumn: string;
    defaultColumnValueProvider: (key: string) => string;
}

export interface IGroupingItem<T> {
    key: string;
    value: string | number | boolean | object;
    data: T[];
}

export interface IGroupingTableColumnConfig {
    key: string;
    header: string;
    cell: <T extends Record<string, any>>(value: T) => any;
}

export function getCellValue(column: IGroupingTableColumnConfig, row: any): any {
    return row[column.key];
}
