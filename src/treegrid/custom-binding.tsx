import {
    TreeGridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Filter,
    Inject,
    DataStateChangeEventArgs,
    Sort,
    TreeGrid,
} from '@syncfusion/ej2-react-treegrid';
import { Ajax } from '@syncfusion/ej2-base';
import * as React from 'react';
import { DataResult } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
.bg-warning {
    --bs-bg-opacity: 1;
    background-color: rgba(255,193,7,1)!important;
}
.bg-danger {
    --bs-bg-opacity: 1;
    background-color: rgba(220,53,69,1)!important;
}
.bg-info {
    --bs-bg-opacity: 1;
    background-color: rgba(13,202,240,1)!important;
}
.bg-success {
    --bs-bg-opacity: 1;
    background-color: rgba(25,135,84,1)!important;
}
.bg-primary {
    --bs-bg-opacity: 1;
    background-color: rgba(13,110,253,1)!important;
}
.bg-secondary {
    --bs-bg-opacity: 1;
    background-color: rgba(108,117,125,1)!important;
}`;

export class CustomBinding extends SampleBase<{}, { data: DataResult }> {
    private treegrid: TreeGrid;
    public taskService: TaskService = new TaskService();
    public data: any;
    public pageSettings = { pageSize: 10, pageCount: 4 };
    public daterules: Object = { date: true, required: true };
    public dateeditparam: any = { params: { format: 'M/d/yyyy' } };

    rendereComplete(): void {
        const initialState = { skip: 0, take: 10 };
        this.dataStateChange(initialState as DataStateChangeEventArgs);
    }

    // Handles data state changes like paging, sorting, and filtering
    public dataStateChange = (state: DataStateChangeEventArgs): void => {
        if (state.requestType === 'expand') {
            this.taskService.execute(state).then((treegridData: DataResult) => {
                // For expand, bind child data directly
                (state as any).childData = treegridData.result;
                (state as any).childDataBind();
            });
        } else {
            this.taskService.execute(state).then((treegridData: DataResult) => {
                this.treegrid.dataSource = treegridData;
            });
        }
    }

    private getPriorityClass = (priority: string) => {
        const classMap: { [key: string]: string } = {
            'Critical': 'badge bg-danger',
            'High': 'badge bg-warning',
            'Medium': 'badge bg-info',
            'Low': 'badge bg-success'
        };
        return classMap[priority] || 'badge bg-secondary';
    };

    private getStatusClass = (status: string) => {
        const classMap: { [key: string]: string } = {
            'Open': 'badge bg-primary',
            'In Progress': 'badge bg-warning',
            'Resolved': 'badge bg-success',
            'Closed': 'badge bg-secondary',
            'Escalated': 'badge bg-danger'
        };
        return classMap[status] || 'badge bg-light text-dark';
    };

    private priorityTemplate = (props: { Priority: string }) => {
        return <span className={this.getPriorityClass(props.Priority)}>{props.Priority}</span>;
    };

    private statusTemplate = (props: { Status: string }) => {
        return <span className={this.getStatusClass(props.Status)}>{props.Status}</span>;
    };

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <style>{SAMPLE_CSS}</style>
                    <TreeGridComponent
                        dataSource={this.data}
                        ref={(g: any) => this.treegrid = g}
                        height={350}
                        allowPaging={true}
                        allowSorting={true}
                        allowFiltering={true}
                        pageSettings={this.pageSettings}
                        treeColumnIndex={1}
                        idMapping="TicketID"
                        parentIdMapping="ParentTicketID"
                        hasChildMapping="isParent"
                        dataStateChange={this.dataStateChange.bind((this))}
                    >
                        <ColumnsDirective>
                            <ColumnDirective field='TicketID' headerText='Ticket ID' width={90} textAlign='Left' isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='Title' headerText='Title' width={250} clipMode="EllipsisWithTooltip"></ColumnDirective>
                            <ColumnDirective field='Category' headerText='Category' textAlign='Left' width={120}></ColumnDirective>
                            <ColumnDirective field='Priority' headerText='Priority' width={100} textAlign='Left' template={this.priorityTemplate}></ColumnDirective>
                            <ColumnDirective field='Status' headerText='Status' width={120} textAlign='Left' template={this.statusTemplate}></ColumnDirective>
                            <ColumnDirective field='AssignedAgent' headerText='Assigned To' textAlign='Left' width={150}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer' textAlign='Left' width={140}></ColumnDirective>
                            <ColumnDirective field='CreatedDate' headerText='Created Date' allowFiltering={false} textAlign='Right' width={130} format='yMd' type='date' ></ColumnDirective>
                            <ColumnDirective field='DueDate' headerText='Due Date' allowFiltering={false} textAlign='Right' width={130} format='yMd' type='date' ></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Sort, Filter]} />
                    </TreeGridComponent>
                </div>
                 <div id="action-description">
                    <p>This demo showcases a ticket management dashboard that displays a hierarchical list of support issues in a Tree Grid.</p>
                </div>
                <div id="description">
                    <p>The Tree Grid can fetch data from external APIs using AJAX, populating the component with the response data. When performing actions like <a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#allowpaging">paging</a>, <a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#allowsorting">sorting</a>, or <a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#allowfiltering">filtering</a>, the <code>dataStateChange</code> event triggers, requiring developers to send an HTTP request and update the Tree Grid with the new data.</p>
                    <p>In this demo, users can navigate the paged Tree Grid, sort data by clicking any column header, and apply filters using the filter bar. Multi-column sorting is supported, and filtering is enabled per column.
                        To enable paging, sorting and filtering set the <code>allowPaging</code>, <code>allowSorting</code> and <code>allowFiltering</code> as <b>true</b>.
                    </p>
                    <p>
                        More information about the custom data binding can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/overview">documentation</a> section.
                    </p>
                </div>
            </div>
        );
    }
}

export class TaskService {
    public ajax: Ajax = new Ajax({
        type: 'GET', mode: true,
        onFailure: (e: Error) => { return false; }
    });
    private BASE_URL: string = 'https://services.syncfusion.com/react/production/api/SupportTicketData';

    // Routes the data request to the appropriate handler
    public execute(state: DataStateChangeEventArgs): Promise<DataResult> {
        if (state.requestType === 'expand') {
            return this.getChildData(state);
        } else {
            return this.getData(state);
        }
    }

    // Fetches child data for an expanded parent row
    public getChildData(state: any): Promise<DataResult> {
        const parentId = state.data.TicketID;
        this.ajax.url = `${this.BASE_URL}/?$filter=ParentTicketID%20eq%20${parentId}`;
        this.ajax.type = 'GET';
        this.ajax.data = undefined;
        return this.ajax.send().then((response: any) => {
            const data = JSON.parse(response);
            return { result: data['result'], count: parseInt(data['count'], 10) };
        });
    }

    // Fetches root level data with OData queries for paging, sorting, etc.
    public getData(state: DataStateChangeEventArgs): Promise<DataResult> {
        const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
        let sortQuery: string = '';
        let filterQuery: string = '';
        if (state.where) {
            filterQuery = this.buildFilterQuery(state.where);
        } else {
            filterQuery = "$filter=ParentTicketID eq null";
        }
        if (state.search && state.search.length > 0) {
            filterQuery += this.buildSearchQuery(state.search);
        }
        if (state.sorted && state.sorted.length > 0) {
            sortQuery = `&$orderby=${(state.sorted as any)
                .map((obj: any) => (obj.direction === 'descending' ? `${obj.name} desc` : obj.name))
                .reverse()
                .join(',')}`;
        }
        this.ajax.url = `${this.BASE_URL}?$inlinecount=allpages&${pageQuery}&${filterQuery}${sortQuery}`;
        this.ajax.type = 'GET';
        this.ajax.data = undefined;
        return this.ajax.send().then((response: any) => {
            const data: any = JSON.parse(response);
            return { result: data['result'], count: parseInt(data['count'], 10) };
        });
    }

    // Builds the filter query string from the treegrid's filter settings.
    public buildFilterQuery = (where: any[]): string => {
        if (!where || where.length === 0) return "$filter=ParentTicketID eq null";
        const andConds = where.map(cond => {
            if (cond.predicates?.length) {
                const groupFilters = cond.predicates.map((pred: any) => this.predicateToString(pred));
                return `(${groupFilters.join(` ${cond.condition ?? "and"} `)})`;
            }
            return this.predicateToString(cond);
        });
        return `$filter=ParentTicketID eq null and ${andConds.join(" and ")}`;
    }

    // Converts a single filter predicate object to the filter string.
    private predicateToString = (pred: any): string => {
        const valStr = typeof pred.value === "string" ? `'${pred.value}'` : pred.value;
        const operator = pred.operator === "equal" ? "eq" : pred.operator;
        if (pred.ignoreCase && typeof pred.value === 'string') {
            return `contains(tolower(${pred.field}), '${String(pred.value).toLowerCase()}')`;
        }
        return `${pred.field} ${operator} ${valStr}`;
    }

    // Builds the OData search query string from the treegrid's search settings.
    private buildSearchQuery = (search: any[]): string => {
        if (!search || !search.length) return "";
        const s = search[0];
        const searchStr = (s.key as string).toLowerCase();
        const orConds = (s.fields || []).map((field: string) => `substringof('${searchStr}',tolower(cast(${field}, 'Edm.String')))`);
        return orConds.length > 0 ? ` and (${orConds.join(" or ")})` : "";
    }
}