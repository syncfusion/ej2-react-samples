import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Toolbar, Inject } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

export class ColumnChooser extends SampleBase<{}, {}> {
    public toolbarOptions: any = ['columnchooser'];
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} toolbar={this.toolbarOptions} allowPaging={true} showColumnChooser={true} >
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' showInColumnChooser={false}></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='right' />
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' visible={false} width='150'></ColumnDirective>
                            <ColumnDirective field='ShipCity' headerText='Ship City' visible={false} width='150'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Toolbar]} />
                    </GridComponent>
                </div>
            </div >
        )
    }
}
ReactDOM.render(<ColumnChooser />, document.getElementById('sample'));