import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent, SelectEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TextBoxComponent, InputEventArgs } from '@syncfusion/ej2-react-inputs';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import './search-filter.css';
import * as dataSource from './datasource.json';

/**
 * Kanban Search Filter sample
 */
function SearchFilter() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];
    let kanbanObj: KanbanComponent;
    let priorityObj: DropDownListComponent;
    let textBoxObj: TextBoxComponent;
    let statusObj: DropDownListComponent;
    let priorityData: string[] = ['None', 'High', 'Normal', 'Low'];
    let statusData: { [key: string]: Object }[] = [
        { id: 'None', value: 'None' },
        { id: 'To Do', value: 'Open' },
        { id: 'In Progress', value: 'InProgress' },
        { id: 'Testing', value: 'Testing' },
        { id: 'Done', value: 'Close' }
    ];
    let value: string = 'None';
    let fields: Object = { text: 'id', value: 'value' };
    function prioritySelect(args: SelectEventArgs): void {
        let filterQuery: Query = new Query();
        if (args.itemData.value !== 'None') {
            filterQuery = new Query().where('Priority', 'equal', args.itemData.value);
        }
        statusObj.value = 'None';
        kanbanObj.query = filterQuery;
    };
    function statusSelect(args: SelectEventArgs): void {
        let filterQuery: Query = new Query();
        if (args.itemData.value !== 'None') {
            filterQuery = new Query().where('Status', 'equal', args.itemData.value);
        }
        priorityObj.value = 'None';
        kanbanObj.query = filterQuery;
    };
    function searchClick(e: InputEventArgs): void {
        let searchValue: string = e.value;
        let searchQuery: Query = new Query();
        if (searchValue !== '') {
            searchQuery = new Query().search(searchValue, ['Id', 'Summary'], 'contains', true);
        }
        kanbanObj.query = searchQuery;
    };
    function resetClick(): void {
        (document.getElementById('search_text') as HTMLInputElement).value = '';
        reset();
    };
    function onFocus(e: any): void {
        if ((e.target as HTMLInputElement).value === '') {
            reset();
        }
    }
    function reset(): void {
        priorityObj.value = 'None';
        statusObj.value = 'None';
        kanbanObj.query = new Query();
    }

    return (
        <div className='kanban-control-section'>
            <div className='col-lg-9 control-section'>
                <div className='control-wrapper'>
                    <KanbanComponent id="kanban" ref={(kanban) => { kanbanObj = kanban }} keyField="Status" dataSource={data}
                        cardSettings={{ contentField: "Summary", headerField: "Id" }} swimlaneSettings={{ keyField: "Assignee" }} >
                        <ColumnsDirective>
                            <ColumnDirective headerText="To Do" keyField="Open" />
                            <ColumnDirective headerText="In Progress" keyField="InProgress" />
                            <ColumnDirective headerText="Testing" keyField="Testing" />
                            <ColumnDirective headerText="Done" keyField="Close" />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div className="col-lg-3 property-section">
                <div className="property-panel-section">
                    <p className="property-panel-header">Filtering</p>
                    <div className="filtering property-panel-content">
                        <table className="e-filter-table">
                            <tr>
                                <td className="e-filter-label">
                                    <div>Priority</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id='priority_filter' ref={(kanban) => { priorityObj = kanban; }} dataSource={priorityData} select={prioritySelect.bind(this)} value={value} placeholder='Select a priority'></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="e-filter-label">
                                    <div>Status</div>
                                </td>
                                <td>
                                    <DropDownListComponent id='status_filter' ref={(kanban) => { statusObj = kanban; }} dataSource={statusData} select={statusSelect.bind(this)} value={value} fields={fields} placeholder='Select a status'></DropDownListComponent>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <p className="property-panel-header">Searching</p>
                    <div className="filtering property-panel-content">
                        <table className="e-filter-table">
                            <tr>
                                <td>
                                    <div>
                                    <TextBoxComponent id="search_text" ref={(kanban) => { textBoxObj = kanban; }} showClearButton={true} placeholder="Enter search text" onFocus={onFocus.bind(this)} input={searchClick.bind(this)}/>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <div className='e-reset-button'>
                            <ButtonComponent id='reset_filter' className="e-btn" onClick={resetClick.bind(this)}>Reset</ButtonComponent>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the filtering and searching actions of Kanban. In this sample, select the key value
                    from drop down list to display the filtered data in Kanban board. Type in search box to be searched in
                    header/content and display the search result
                    in a board.
                </p>
            </div>
            <div id="description">
                <p>
                    The Kanban provides an option to filter or search the cards and displayed on Kanban board using <code>query</code> property.
                </p>
                <ul>
                    <li>In query, <code>where</code> used for filtering the Kanban cards.</li>
                    <li>In query, <code>search</code> is used for searching the cards.</li>
                </ul>
            </div>
        </div>
    );
}
export default SearchFilter;