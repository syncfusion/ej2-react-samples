import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, RowDD, Inject } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

export class Source extends SampleBase<{}, {}> {

    public data: Object[] = data.slice(0, 24);
    public rowDropSettings: Object = { targetID: 'DestGrid' };
    public srcSelectionSettings: Object = { type: 'multiple' };
    public destSelectionSettings: Object = { type: 'multiple' };
    public rowDropSettings2: Object = { targetID: 'Grid' };

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <p>Drag and Drop Rows between two Grids</p>
                    <div style={{ display: 'inline-block' }}>
                        <div style={{ float: 'left', width: '49%' }}>
                            <GridComponent id="Grid" dataSource={this.data} allowPaging={true} pageSettings={{ pageCount: 2 }} allowRowDragAndDrop={true} rowDropSettings={this.rowDropSettings} selectionSettings={this.srcSelectionSettings}>
                                <ColumnsDirective>
                                    <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right'></ColumnDirective>
                                    <ColumnDirective field='CustomerName' headerText='Customer Name' width='130'></ColumnDirective>
                                    <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
                                </ColumnsDirective>
                                <Inject services={[Page, RowDD]} />
                            </GridComponent>
                        </div>
                        <div style={{ float: 'right', width: '49%' }}>
                            <GridComponent id="DestGrid" allowPaging={true} pageSettings={{ pageCount: 2 }} allowRowDragAndDrop={true} rowDropSettings={this.rowDropSettings2} selectionSettings={this.destSelectionSettings}>
                                <ColumnsDirective>
                                    <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right'></ColumnDirective>
                                    <ColumnDirective field='CustomerName' headerText='Customer Name' width='130'></ColumnDirective>
                                    <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
                                </ColumnsDirective>
                                <Inject services={[Page, RowDD]} />
                            </GridComponent>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Source />, document.getElementById('sample'));