import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, RowDD, Inject, Sort, Toolbar, ToolbarItems, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { updateSampleSection } from '../common/sample-base';

function Source() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const filterSettings: FilterSettingsModel = {type: 'Excel'};
    const toolbar: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const customeridRule: Object = { required: true, minLength: 5};
    const orderidRules: Object = { required: true, number: true };
    const freightRules: Object = { required: true, min: 0 };
    const data: Object[] = orderDetails;
    const rowDropSettings: Object = { targetID: 'DestGrid' };
    const srcSelectionSettings: Object = { type: 'Multiple' };
    const destSelectionSettings: Object = { type: 'Multiple' };
    const rowDropSettings2: Object = { targetID: 'Grid' };
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <p>Drag and Drop Rows between two Grids</p>
                <div style={{ display: 'inline-block' }}>
                    <div style={{ float: 'left', width: '49%' }}>
                        <GridComponent id="Grid" dataSource={data} allowPaging={true} pageSettings={{ pageCount: 1 }} allowSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} toolbar={toolbar} allowRowDragAndDrop={true} rowDropSettings={rowDropSettings} selectionSettings={srcSelectionSettings}>
                            <ColumnsDirective>
                                <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
                                <ColumnDirective field='CustomerName' headerText='Customer Name' width='130' validationRules={customeridRule} ></ColumnDirective>
                                <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={freightRules} editType='numericedit'/>
                            </ColumnsDirective>
                            <Inject services={[Page, RowDD, Sort, Toolbar, Filter, Edit]} />
                        </GridComponent>
                    </div>
                    <div style={{ float: 'right', width: '49%' }}>
                        <GridComponent id="DestGrid" allowPaging={true} pageSettings={{ pageCount: 2 }} allowSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} toolbar={toolbar} allowRowDragAndDrop={true} rowDropSettings={rowDropSettings2} selectionSettings={destSelectionSettings}>
                            <ColumnsDirective>
                                <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
                                <ColumnDirective field='CustomerName' headerText='Customer Name' width='130' validationRules={customeridRule} ></ColumnDirective>
                                <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={freightRules} editType='numericedit'/>
                            </ColumnsDirective>
                            <Inject services={[Page, RowDD, Sort, Toolbar, Filter, Edit]} />
                        </GridComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the Grid component with the row drag and drop feature. Drag and drop rows between Grids
                    to move rows.
                </p>
            </div>
            <div id='description'>
                <p>Grid rows can be dragged and dropped to another Grid or custom controlled by
                    enabling <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid#allowrowdraganddrop">
                        allowRowDragAndDrop
                    </a></code> property. The target control on which the
                    Grid rows has to be dropped can be set by using <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid#rowdropsettings">
                        rowDropSettings-&gt;targetID</a></code> property.</p>
                <p>The Selection feature should be enabled to select the rows. Multiple rows can be selected by
                    simply clicking and dragging inside the Grid.</p>
                <p>In this demo, we have demonstrated how to drag and drop the rows between Grids. Row drag and drop feature
                    is enabled in both the Grids. To drag and drop rows between Grids select rows, drag and drop them
                    in the adjacent Grid.
                </p>
                <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                <p>
                    Grid component features are segregated into individual feature-wise modules. To use row, drag and drop feature we need to inject
                    <code>RowDD</code> module into the <code>services</code>. Since the selection feature is required
                    to select rows, we also need to inject the <code>Selection</code> module.
                </p>
                <p>
                    More information on the row drag and drop can be found in this
                    <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/grid/row/row-drag-and-drop">
                        documentation section</a>.
                </p>

            </div>
        </div>
    )
}
export default Source;
