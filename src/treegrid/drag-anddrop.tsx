import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TreeGridComponent, RowDD, Page, ColumnsDirective, ColumnDirective, Inject } from '@syncfusion/ej2-react-treegrid';
import { SampleBase } from '../common/sample-base';
import { dragData } from './data';
export class DragAndDropBetween extends SampleBase<{}, {}> {
    public data: Object[] = dragData;
    public rowDropSettings: Object = { targetID: 'DestGrid' };
    public srcSelectionSettings: Object = { type: 'Multiple' };
    public destSelectionSettings: Object = { type: 'Multiple' };
    public rowDropSettings2: Object = { targetID: 'TreeGrid' };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <p>Drag and Drop Rows between two TreeGrids</p>
                    <div style={{ display: 'inline-block' }}>
                        <div style={{ float: 'left', width: '49%' }}>
                            <TreeGridComponent id="TreeGrid" dataSource={this.data} treeColumnIndex={1} childMapping='subtasks' allowPaging={true} pageSettings={{ pageCount: 2 }} allowRowDragAndDrop={true} rowDropSettings={this.rowDropSettings} selectionSettings={this.srcSelectionSettings}>
                            <ColumnsDirective>
                            <ColumnDirective field='taskID' isPrimaryKey={true} headerText='Task ID' width='100' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='taskName' headerText='Task Name' width='180'></ColumnDirective>
                            <ColumnDirective field='startDate' headerText='Start Date' width='110' format='yMd' textAlign='Right' type='date' />
                            <ColumnDirective field='duration' headerText='Duration' width='100' textAlign='Right' />
                            </ColumnsDirective>
                            <Inject services={[Page, RowDD]} />
                            </TreeGridComponent>
                        </div>
                        <div style={{ float: 'right', width: '49%' }}>
                            <TreeGridComponent id="DestGrid" childMapping='subtasks' treeColumnIndex={1} allowPaging={true} pageSettings={{ pageCount: 2 }} allowRowDragAndDrop={true} rowDropSettings={this.rowDropSettings2} selectionSettings={this.destSelectionSettings}>
                            <ColumnsDirective>
                            <ColumnDirective field='taskID' isPrimaryKey={true} headerText='Task ID' width='100' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='taskName' headerText='Task Name' width='180'></ColumnDirective>
                            <ColumnDirective field='startDate' headerText='Start Date' width='110' format='yMd' textAlign='Right' type='date' />
                            <ColumnDirective field='duration' headerText='Duration' width='100' textAlign='Right' />
                            </ColumnsDirective>
                                <Inject services={[Page, RowDD]} />
                            </TreeGridComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
        <p>This sample demonstrates the TreeGrid component's row drag and drop feature, enabling users to transfer tasks between tree grids effortlessly via drag and drop actions.
        </p>
    </div>
    <div id="description">
        <p>Enabling the <code><a target="_blank" 
            href="https://helpej2.syncfusion.com/react/documentation/api/treegrid/#allowrowdraganddrop">
            allowRowDragAndDrop
        </a></code> property facilitates drag and drop functionality for Tree Grid rows. Additionally, when performing row drag and drop between tree grids,
             the <code><a target="_blank" 
                href="https://helpej2.syncfusion.com/react/documentation/api/treegrid/#rowdropsettings">
                TreeGridRowDropSettings
            </a></code> component's <code>
                <a target="_blank" 
                href="https://ej2.syncfusion.com/react/documentation/api/treegrid/rowDropSettings/#targetid">
                targetID </a></code> property specifies the target onto which the Tree Grid rows should be dropped.</p>
          <p>For the row drag and drop feature to function correctly, it's essential to have a primary key column. To define this primary key, ensure that <code><a target="_blank" 
            href="https://ej2.syncfusion.com/react/documentation/api/treegrid/column/#isprimarykey">
            isPrimaryKey
        </a></code> is set to <code>true</code> for a unique data column.</p>
        <p>To select the rows, enable the <code><a target="_blank" 
            href="https://ej2.syncfusion.com/react/documentation/treegrid/selection/selection">
            Selection </a></code>feature. Selecting multiple rows within the Tree Grid is as simple as clicking and dragging them.</p>
        <p>The Row drag and drop feature is enabled in both TreeGrids in this demo. Drag and drop rows between TreeGrids by selecting the rows and dragging them to the adjacent TreeGrid.</p>
        <p>
            More information on the row drag and drop can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/row/row-drag-and-drop#drag-and-drop-to-another-tree-grid">
            documentation </a>section.
        </p>   
    </div>
    </div>
        )
    }
}
