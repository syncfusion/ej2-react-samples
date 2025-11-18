import { GridComponent } from '@syncfusion/ej2-react-grids';
import { Sort, GridActionData, Filter } from './datasource';

export const executeGridAction = (data: GridActionData, grid: GridComponent) => {
    if (data.filter && data.filter.length) {
        data.filter.forEach((filter: Filter) => {
            grid.filterByColumn(filter.field, filter.operator, filter.value);
        })
    }
    if (data.clearFilter) {
        if (data.clearFilter.length === 0) {
            grid.clearFiltering();
        } else {
            grid.clearFiltering(data.clearFilter);
        }
    }
    if (data.sort && data.sort.length) {
        data.sort.forEach((sort: Sort) => {
            grid.sortColumn(sort.field, sort.direction, true);
        })
    }
    else if (data.clearSort) {
        grid.clearSorting();
    }
    if (data.page && data.page.pageNumber && data.page.pageSize) {
        grid.goToPage(data.page.pageNumber);
    }
    if (data.group && data.group.length) {
        const groupColumns: string[] = [...(grid.groupSettings.columns ?? [])];
        if (groupColumns.indexOf(data.group[0]) === -1) {
            grid.groupColumn(data.group[0]);
        }
    }
    if (data.clearGroup) {
        if (data.clearGroup.length === 0) {
            grid.clearGrouping();
        } else {
            const groupColumns: string[] = [...(grid.groupSettings.columns ?? [])];
            if (groupColumns.indexOf(data.clearGroup[0]) !== -1) {
                grid.ungroupColumn(data.clearGroup[0]);
            }
        }
    }
}