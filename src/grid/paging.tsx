import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';

export class Paging extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={data} allowPaging={true} pageSettings={{ pageCount: 4, pageSizes: true }}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='170'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page]} />
                    </GridComponent>
                </div>
                <div id='description'>
                    <p>
                        Paging allows you to display the contents of the Grid component in page segments.
                        By default, paging is disabled. To enable paging, set <code><a target='_blank' className='code'
                            href='http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowpaging-boolean'>
                            allowPaging</a></code> property to true.
            <code><a target='_blank' className='code'
                            href='http://ej2.syncfusion.com/react/documentation/grid/api-pageSettings.html#pagesizes-boolean---number'>
                            pageSettings->pagesizes</a></code>property enables a dropdown in pager which allows you to change the number of records in the Grid dynamically.
                    </p>
                    <p>
                        In this demo, the Grid is rendered with
        <code><a target="_blank" className="code"
                            href="http://ej2.syncfusion.com/react/documentation/grid/api-pageSettings.html#pagesizes-boolean---number">
                            pageSettings->pageSizes
        </a></code> set to true and
        <code><a target="_blank" className="code"
                            href="http://ej2.syncfusion.com/react/documentation/grid/api-pageSettings.html#pagesizes-boolean---number">
                            pageSettings->pageCount
        </a></code> set to 4.
        </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid component features are segregated into individual feature-wise modules. To use paging feature, we need to inject <code>Page</code> module into the <code>services</code>.</p>
                    <p>
                        More information on the paging feature configuration can be found in this
            <a target='_blank' href='http://ej2.syncfusion.com/react/documentation/grid/paging.html'> documentation section</a>.
          </p>
                </div>
            </div>
        )
    }
}