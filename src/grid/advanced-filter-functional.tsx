import * as React from 'react';
import {
    GridComponent, ColumnsDirective, ColumnDirective, Inject, Sort, Edit, Toolbar, VirtualScroll, AdvancedFilter,
    EditSettingsModel, Freeze, Column, LoadEventArgs
} from '@syncfusion/ej2-react-grids';
import { ticketdata } from './data';
import { updateSampleSection } from '../common/sample-base';

function AdvancedFiltering() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let gridInstance: GridComponent;
    const initialAdvancedFilterRule = {
        condition: 'and',
        rules: [{
            field: 'Status',
            label: 'Status',
            type: 'string',
            operator: 'notequal',
            value: 'done'
        }]
    };
    const advancedFilterSettings = {
        queryBuilderSettings: {
            rule: initialAdvancedFilterRule
        }
    };
    const actionBegin = (args: any): void => {
        if (!gridInstance) {
            return;
        }

        const hideColumns = (visible: boolean): void => {
            const fields = ['Title', 'TypeofRequest', 'CreatedDate'];
            fields.forEach((field) => {
                const column = gridInstance.getColumnByField(field) as Column | undefined;
                if (column) {
                    column.visible = visible;
                }
            });
        };

        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            hideColumns(false);
        }

        if (args.requestType === 'save' || args.requestType === 'cancel') {
            hideColumns(true);
        }
    };

    function load(args: LoadEventArgs) {
        if (args) {
            args.enableSeamlessScrolling = true;
        }
    }
    const toolbarOptions: string[] = ['Edit', 'Delete', 'AdvancedFilter'];
    const editSettings: EditSettingsModel = { allowEditing: true, allowDeleting: true, mode:'Dialog' };
    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <GridComponent ref={(grid) => (gridInstance = grid!)} dataSource={ticketdata} enableVirtualization={true} allowSorting={true} load={load.bind(this)}
                    allowAdvancedFiltering={true} toolbar={toolbarOptions} rowHeight={45} editSettings={editSettings} pageSettings={{ pageSize: 50 }} height={400} advancedFilterSettings={advancedFilterSettings} actionBegin={actionBegin}>
                    <ColumnsDirective>
                        <ColumnDirective field='TicketID' headerText='Ticket ID' textAlign='Right' width='120' isPrimaryKey={true}></ColumnDirective>
                        <ColumnDirective field='Title' headerText='Title' width='260' allowEditing={false}></ColumnDirective>
                        <ColumnDirective field='TypeofRequest' headerText='Type' width='150' allowEditing={false}></ColumnDirective>
                        <ColumnDirective field='Assignee' headerText='Assignee' width='150' editType='dropdownedit'></ColumnDirective>
                        <ColumnDirective field='Priority' headerText='Priority' width='130' editType='dropdownedit'></ColumnDirective>
                        <ColumnDirective field='Status' headerText='Status' width='130' editType='dropdownedit'></ColumnDirective>
                        <ColumnDirective field='CreatedDate' headerText='Created Date' width='140' textAlign='Right' format='yMd' allowEditing={false}></ColumnDirective>
                        <ColumnDirective field='DueDate' headerText='Due Date' width='140' textAlign='Right' format='yMd' editType='datepickeredit'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Sort, Edit, Toolbar, VirtualScroll, AdvancedFilter, Freeze]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the Advanced Filter feature of the Data Grid, providing a Query Builder-based interface for creating complex filtering criteria. Users can filter records using multiple conditions and combine them with logical operators such as "AND" and "OR" to achieve precise results.</p>
            </div>
            <div id="description">
                <p>
                    In this demo, the Advanced Filter dialog is opened from the toolbar by enabling the <code>allowAdvancedFiltering</code> property and adding <code>AdvancedFilter</code> to the toolbar items. The Query Builder interface allows users to filter records by defining conditions and rule groups, which are applied to the grid when the "Apply" action is performed.
                </p>

                <p>
                    <strong>Injecting Module:</strong>
                </p>
                <p>
                    Grid component features are segregated into individual feature-wise modules. To use the Advanced Filter feature, inject the <code>AdvancedFilter</code> module into the <code>services</code>.
                </p>
                <p>
                    More information on the filter configuration can be found in this
                    <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/grid/filtering.html'> documentation section</a>.
                </p>
                <p>Looking for the full React Data Grid component overview, features, pricing, and documentation? Visit our
                    <a target="_blank"
                        href="https://www.syncfusion.com/react-components/react-data-grid"> React Data Grid component</a> page.</p>
            </div>
        </div>
    );
}

export default AdvancedFiltering;