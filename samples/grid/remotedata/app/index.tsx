import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import { DataManager, ODataV4Adaptor, Query, DataOptions } from '@syncfusion/ej2-data';
import { SampleBase } from './sample-base';

export class RemoteDataBinding extends SampleBase<{}, {}> {

    public data = new DataManager({ url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Products', adaptor: new ODataV4Adaptor });
    public gridInstance: GridComponent;
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent id="Grid" dataSource={this.data} ref={grid => this.gridInstance = grid} allowPaging={true} pageSettings={{ pageCount: 8 }} >
                        <ColumnsDirective>
                            <ColumnDirective field='ProductID' headerText='ID' width='120' ></ColumnDirective>
                            <ColumnDirective field='ProductName' headerText='Name' width='160'></ColumnDirective>
                            <ColumnDirective field='UnitPrice' headerText='Unit Price' width='120' format='C2' />
                            <ColumnDirective field='UnitsInStock' headerText='Units In Stock' width='150' textAlign='right' />
                            <ColumnDirective field='Discontinued' headerText='Discontinued' width='150'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page]} />
                    </GridComponent>
                </div>
                <div id='waitingpopup' className='waitingpopup'>
                    <span id='gif' className='image'></span>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<RemoteDataBinding />, document.getElementById('sample'));