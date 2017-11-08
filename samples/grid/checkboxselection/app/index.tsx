import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, SelectionSettings } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

export class CheckboxSelection extends SampleBase<{}, {}> {

    public selectionsettings: Object = { persistSelection: true };
    private gridInstance: GridComponent;

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} ref={grid => this.gridInstance = grid} enableHover={false} allowPaging={true} selectionSettings={this.selectionsettings}>
                        <ColumnsDirective>
                            <ColumnDirective type='checkbox' width='50'></ColumnDirective>
                            <ColumnDirective field='OrderID' isPrimaryKey={true} headerText='Order ID' width='120' textAlign="right"></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="right"></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Selection]} />
                    </GridComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<CheckboxSelection />, document.getElementById('sample'));