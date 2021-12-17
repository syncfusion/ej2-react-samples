import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Freeze, Inject, Resize, Sort } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

{/* custom code start */}
const SAMPLE_CSS = `
    .bootstrap5 tr.e-row, .bootstrap5-dark tr.e-row, .tailwind tr.e-row, .tailwind-dark tr.e-row{
        height:39px;
    }
    `;
{/* custom code end */}
export class FrozenColumn extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                {/* custom code start */}
                    <style>
                        {SAMPLE_CSS}
                  </style>
                {/* custom code end */}
                <div className='control-section'>
                <TreeGridComponent dataSource={sampleData} frozenColumns={2} allowSelection={false} allowResizing={true} allowSorting={true} childMapping = 'subtasks' treeColumnIndex={1} height='410' >
                <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' width='100' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='260'></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' width='230' format='yMd' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='endDate' headerText='End Date' width='230' format='yMd' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='duration' headerText='Duration' width='210' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='progress' headerText='Progress' width='210' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='priority' headerText='Priority' width='230'></ColumnDirective>
                <ColumnDirective field='approved' headerText='Approved' textAlign='Center' width='230'></ColumnDirective>
                </ColumnsDirective>
                <Inject services={[Freeze, Resize, Sort]} />
                </TreeGridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the frozen columns feature of the Tree Grid. Scroll the movable content horizontally to view the frozen columns with the content.</p>
                </div>
                <div id="description">
                <p>
        The freezing feature enables the user to freeze certain columns to scroll remaining movable content. This can be achieved by setting <b>frozenColumns</b> property.
    </p>
    <p>
        Note: In this demo sample, the first two columns is set to frozen by using the <code><a target="_blank" className="code"
        href="https://ej2.syncfusion.com/react/documentation/api/treegrid/column/#frozencolumns">frozenColumns
        </a></code> properties.
    </p>
    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
    <p>
        Tree Grid features are segregated into individual feature-wise modules. 
        To use frozen columns feature, we need to inject
        <code><a target="_blank" className="code"
        href="https://ej2.syncfusion.com/react/documentation/api/treegrid/frozenrowsandcolumns"> Freeze </a> </code> module into the <code>services</code>.
    </p>
</div>
</div>
        )
    }

}