import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';

export class RowHeight extends SampleBase<{}, {}> {

   /**
    * Row height sample
    */

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data.slice(0,20)} allowPaging={true} pageSettings={{ pageCount: 5, pageSize: 10 }} rowHeight={50}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='80' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='170'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='135' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='160' format='C2' textAlign='right' />
                        </ColumnsDirective>
                        <Inject services={[Page]} />
                    </GridComponent>
                </div>
                <div id='description'>
                    <p>
                        The Grid has support to provide <code><a target='_blank' className='code'
                        href='http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#rowheight-number'>
                        rowHeight</a></code> property.</p>

                    <p>In this demo, the row height for all the Grid rows is set as <b>50px</b> using the <b>rowHeight</b> property.</p>
                </div>
            </div>
        )
    }
}
