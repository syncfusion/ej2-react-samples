import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Filter, Inject } from '@syncfusion/ej2-react-grids';
import { categoryData } from '../data';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';

export class Searching extends SampleBase<{}, {}> {

    public toolbarOptions: any = ['search'];
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <GridComponent dataSource={categoryData} toolbar={this.toolbarOptions} allowPaging={true} pageSettings={{ pageSize: 10 }} >
                        <ColumnsDirective>
                            <ColumnDirective field='CategoryName' headerText='Category Name' width='170'></ColumnDirective>
                            <ColumnDirective field='ProductName' headerText='Product Name' width='150'></ColumnDirective>
                            <ColumnDirective field='QuantityPerUnit' headerText='Quantity PerUnit' width='180' textAlign='right' />
                            <ColumnDirective field='UnitsInStock' headerText='Units In Stock' width='150' textAlign='right' />
                        </ColumnsDirective>
                        <Inject services={[Toolbar, Page]} />
                    </GridComponent>
                </div>

            </div>
        )
    }
}
ReactDOM.render(<Searching />, document.getElementById('sample'));