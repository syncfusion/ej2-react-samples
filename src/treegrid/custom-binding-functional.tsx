import { TreeGrid, TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject, DataStateChangeEventArgs, Sort } from '@syncfusion/ej2-react-treegrid';
import { Ajax } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as React from 'react';
import { DataResult } from '@syncfusion/ej2-react-grids';

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

function CustomBinding() {
    let treegrid: TreeGrid;
    let data: any;
    const BASE_URL: string = 'https://services.syncfusion.com/react/production/api/SupportTicketData';
    const pageSettings = { pageSize: 10, pageCount: 4 };
    const daterules: Object = { date: true, required: true };
    const dateeditparam: any = { params: { format: 'M/d/yyyy' } };
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, []);

    function rendereComplete() {
        let state = { skip: 0, take: 10 };
        dataStateChange(state);
    }

    // Handles data state changes from the Tree Grid (e.g., paging, sorting, filtering).
    function dataStateChange(state: any) {
        if (state.requestType === 'expand') {
            execute(state).then((treegridData: any) => {
                state.childData = treegridData.result;
                state.childDataBind();
            });
        } else {
            execute(state).then((treegridData: any) => { treegrid.dataSource = treegridData });
        }
    }

    const ajax: Ajax = new Ajax({
        type: 'GET', mode: true,
        onFailure: (e: Error) => { return false; }
    });

    // Executes the data operation based on the provided treegrid state.
    function execute(state: DataStateChangeEventArgs): Promise<DataResult> {
        if (state.requestType === 'expand') {
            return getChildData(state);
        } else {
            return getData(state);
        }
    }

    // Fetches child records for a given parent record when a row is expanded.
    function getChildData(state: any): Promise<DataResult> {
        var parentId = state.data.TicketID;
        ajax.url = "".concat(BASE_URL, "/?$filter=ParentTicketID%20eq%20").concat(parentId);
        ajax.type = 'GET';
        return ajax.send().then(function (response: any) {
            var data = JSON.parse(response);
            return { result: data['result'], count: parseInt(data['count'], 10) };
        });
    }

    // Builds the filter query string from the treegrid's filter settings.
    function buildFilterQuery(where: any[]): string {
        if (!where || where.length === 0) return "$filter=ParentTicketID eq null";
        const andConds: string[] = [];
        for (const cond of where) {
            if (cond.predicates?.length) {
                const groupFilters = cond.predicates.map((pred: any) => predicateToString(pred));
                andConds.push(`(${groupFilters.join(` ${cond.condition ?? "and"} `)})`);
            } else {
                andConds.push(predicateToString(cond));
            }
        }
        if (andConds.length > 0) {
            return `$filter=ParentTicketID eq null and ${andConds.join(" and ")}`;
        }
        return "$filter=ParentTicketID eq null";
    }

    // Converts a single filter predicate object to the filter string.
    function predicateToString(pred: any): string {
        let field = pred.field;
        let value = pred.value;
        let ignoreCase = pred.ignoreCase;
        let valStr = typeof value === "string" ? `'${value}'` : value;

        switch (pred.operator) {
            case "equal":
                if (ignoreCase && typeof value === "string") {
                    return `(tolower(${field}) eq '${value.toLowerCase()}')`;
                }
                return `${field} eq ${valStr}`;
            case "contains":
                if (ignoreCase && typeof value === "string") {
                    return `contains(tolower(${field}), '${value.toLowerCase()}')`;
                }
                return `contains(${field}, ${valStr})`;
            case "startswith":
                if (ignoreCase && typeof value === "string") {
                    return `startswith(tolower(${field}), '${value.toLowerCase()}')`;
                }
                return `startswith(${field}, ${valStr})`;
            default:
                return "";
        }
    }

    // Builds the OData search query string from the treegrid's search settings.
    function buildSearchQuery(search: any[]): string {
        if (!search || !search.length) return "";
        const s = search[0];
        const searchStr = (s.key as string).toLowerCase();
        const fields = s.fields || [];
        const orConds: string[] = [];

        fields.forEach((field: string) => {
            orConds.push(`substringof('${searchStr}',tolower(cast(${field}, 'Edm.String')))`);
        });
        if (!orConds.length) return "";
        return ` and (${orConds.join(" or ")})`;
    }

    // Fetches the main data based on the provided treegrid state (paging, sorting, filtering).
    function getData(state: DataStateChangeEventArgs): Promise<DataResult> {
        const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
        let sortQuery: string = '';
        let filterQuery: string = '';
        if (state.where) {
            filterQuery = buildFilterQuery(state.where);
        } else {
            filterQuery = "$filter=ParentTicketID eq null";
        }
        if (state.search) {
            filterQuery += buildSearchQuery(state.search);
        }
        if ((state.sorted || []).length) {
            sortQuery =
                `&$orderby=` +
                (state as any).sorted
                    .map((obj: any) => {
                        return obj.direction === 'descending'
                            ? `${obj.name} desc`
                            : obj.name;
                    })
                    .reverse()
                    .join(',');
        }

        ajax.url = `${BASE_URL}?$inlinecount=allpages&${pageQuery}&${filterQuery}${sortQuery}`;
        ajax.type = 'GET';
        return ajax.send().then((response: any) => {
            let data: any = JSON.parse(response);
            return { result: data['result'], count: parseInt(data['count'], 10) };
        });
    }
    const getPriorityClass = (priority: string) => {
        switch (priority) {
            case 'Critical': return 'badge bg-danger';
            case 'High': return 'badge bg-warning';
            case 'Medium': return 'badge bg-info';
            case 'Low': return 'badge bg-success';
            default: return 'badge bg-secondary';
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Open': return 'badge bg-primary';
            case 'In Progress': return 'badge bg-warning';
            case 'Resolved': return 'badge bg-success';
            case 'Closed': return 'badge bg-secondary';
            case 'Escalated': return 'badge bg-danger';
            default: return 'badge bg-light text-dark';
        }
    };
    const priorityTemplate = (props: { Priority: string }) => {
        return <span className={getPriorityClass(props.Priority)}>{props.Priority}</span>;
    };


    const statusTemplate = (props: { Status: string }) => {
        return <span className={getStatusClass(props.Status)}>{props.Status}</span>;
    };
    return (
        <div className="control-pane">
            <div className="control-section">
                <style>{SAMPLE_CSS}</style>
                <TreeGridComponent
                    dataSource={data}
                    ref={(g: any) => treegrid = g}
                    height="350"
                    allowPaging={true}
                    allowSorting={true}
                    allowFiltering={true}
                    pageSettings={pageSettings}
                    treeColumnIndex={1}
                    idMapping="TicketID"
                    parentIdMapping="ParentTicketID"
                    hasChildMapping="isParent"
                    dataStateChange={dataStateChange.bind((this))}
                >
                     <ColumnsDirective>
                        <ColumnDirective field='TicketID' headerText='Ticket ID' width={90} textAlign='Left' isPrimaryKey={true}></ColumnDirective>
                        <ColumnDirective field='Title' headerText='Title' width={250} textAlign='Left' clipMode="EllipsisWithTooltip"></ColumnDirective>
                        <ColumnDirective field='Category' headerText='Category' textAlign='Left' width={120}></ColumnDirective>
                        <ColumnDirective field='Priority' headerText='Priority' width={100} textAlign='Left' template={priorityTemplate}></ColumnDirective>
                        <ColumnDirective field='Status' headerText='Status' width={120} textAlign='Left' template={statusTemplate}></ColumnDirective>
                        <ColumnDirective field='AssignedAgent' headerText='Assigned To' textAlign='Left' width={150}></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer' textAlign='Left' width={140}></ColumnDirective>
                        <ColumnDirective field='CreatedDate' headerText='Created Date' allowFiltering={false} textAlign='Right' width={130} format='yMd' type='date'></ColumnDirective>
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
    )
}
export default CustomBinding;