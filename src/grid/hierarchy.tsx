import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, DetailRow, Page, Sort } from '@syncfusion/ej2-react-grids';
import {Grid} from '@syncfusion/ej2-grids';
import { employeeData, customerData, orderDatas } from './data';
import { SampleBase } from '../common/sample-base';

export class Hierarchy extends SampleBase<{}, {}> {

    public secondChildGrid: any = {
        dataSource: customerData,
        queryString: 'CustomerID',
        columns: [
            { field: 'CustomerID', headerText: 'Customer ID', textAlign: 'Right', width: 75 },
            { field: 'ContactName', headerText: 'Contact Name', width: 100 },
            { field: 'Address', headerText: 'Address', width: 120 },
            { field: 'Country', headerText: 'Country', width: 100 }
        ]
    };
    public childGrid: any = {
        dataSource: orderDatas,
        queryString: 'EmployeeID',
        allowPaging: true,
        pageSettings: { pageSize: 6, pageCount: 5 },
        columns: [
            { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
            { field: 'ShipCity', headerText: 'Ship City', width: 120 },
            { field: 'Freight', headerText: 'Freight', width: 120 },
            { field: 'ShipName', headerText: 'Ship Name', width: 150 }
        ],
        childGrid: this.secondChildGrid
    };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={employeeData} childGrid={this.childGrid} allowSorting={true} >
                        <ColumnsDirective>
                            <ColumnDirective field='EmployeeID' headerText='Employee ID' width='125' textAlign='Right' />
                            <ColumnDirective field='FirstName' headerText='Name' width='125' />
                            <ColumnDirective field='Title' headerText='Title' width='180' />
                            <ColumnDirective field='HireDate' headerText='Hire Date' width='135' format={{ skeleton: 'yMd', type: 'date' }} textAlign='Right' />
                            <ColumnDirective field='ReportsTo' headerText='Reports To' width='135' textAlign='Right' />
                        </ColumnsDirective>
                        <Inject services={[DetailRow, Page, Sort]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the hierarchical binding of the Grid component. Click the expand button to view the child Grid
        of a particular record.
    </p>
                </div>
                <div id="description">
                    <p>
                    The Hierarchy Grid is used to display table data in hierarchical structure which can show or hide by clicking on expand or collapse button. 
                    This feature can be enabled by defining <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/documentation/grid/api-grid.html#childgrid-gridmodel">
                        childGrid</a></code> and <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/documentation/grid/api-grid.html#querystring-string">
                        childGrid.queryString</a></code>. And the <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/documentation/grid/api-grid.html#detaildatabound-emittypedetaildataboundeventargs">
                        detailDataBound</a></code> event triggers at initial expand of every child Grid.      
                    </p>
                    <p>
                    In this demo, three level hierarchy is demonstrated with hierarchical structure Employee -> Orders -> Customers.
                    </p>    
                    <br/>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid features are segregated into individual feature-wise modules.         
                        To use Hierarchy Grid feature, we need to inject <code>DetailRow</code> using the <code>Grid.Inject(DetailRow)</code> section.
                    </p>
                </div>
            </div>
        )
    }
}
