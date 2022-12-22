import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, VirtualScroll, Edit, Toolbar, RowDD } from '@syncfusion/ej2-react-treegrid';
import { virtualData, dataSource } from './data';
import { updateSampleSection } from '../common/sample-base';

function VirtualScrolling() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Indent', 'Outdent'];
    const editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row', newRowPosition: 'Child' };
    const validationRule: Object = { required: true };
    const validationRule1: Object = { required: true, number: true };
    if (virtualData.length === 0) {
        dataSource();
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <TreeGridComponent dataSource={virtualData} childMapping='Crew' enableVirtualization={true} treeColumnIndex={1} editSettings={editSettings} toolbar={toolbarOptions} height='400' >
                    <ColumnsDirective>
                        <ColumnDirective field='TaskID' headerText='Player Jersey' validationRules={validationRule1} width='120' textAlign='Right' isPrimaryKey={true}></ColumnDirective>
                        <ColumnDirective field='FIELD1' headerText='Player Name' validationRules={validationRule} width='120'></ColumnDirective>
                        <ColumnDirective field='FIELD2' headerText='Year' width='100' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='FIELD3' headerText='Stint' width='120' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='FIELD4' headerText='TMID' width='120' textAlign='Right'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[VirtualScroll, Edit, Toolbar, RowDD]} />
                </TreeGridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the Tree Grid component with the virtual scrolling feature. Scroll the Tree Grid content vertically to load rows.
                </p>
            </div>
            <div id="description">
                <p>
                    The Tree Grid UI virtualization allows you to render only rows visible within the view-port without buffering the entire datasource.
                    To enable the virtualization, set <code><a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualization"> enableVirtualization
                    </a></code> property as true.
                </p>
                <p>
                    By default, <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualmaskrow">
                    enableVirtualMaskRow </a></code> is set to true. we can change by setting <code>enableVirtualMaskRow</code> property to false.
                </p>
                <p>
                    Note: The <code><a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#height">height
                    </a></code> property must be defined when enabling <code><a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablevirtualization"> enableVirtualization
                    </a></code>
                </p>
                <p>
                    In this demo, Tree Grid is enabled with row virtualization and also perform the CRUD (Add, Edit, Delete, Update) actions.
                </p>
                <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                <p>
                    Tree Grid features are segregated into individual feature-wise modules.
                    To use virtual scrolling feature, we need to inject <code>VirtualScroll</code> module into the <code>services</code>.
                </p>
            </div>
        </div>
    )
}
export default VirtualScrolling;