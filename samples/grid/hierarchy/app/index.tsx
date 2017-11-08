import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, DetailRow, Page } from '@syncfusion/ej2-react-grids';
import { employeeData, customerData, orderDatas } from '../data';
import { SampleBase } from './sample-base';

export class Hierarchy extends SampleBase<{}, {}> {

    public secondChildGrid = {
            dataSource: customerData,
            queryString: 'CustomerID',
            columns: [
                { field: 'CustomerID', headerText: 'Customer ID', textAlign: 'right', width: 75 },
                { field: 'Phone', headerText: 'Phone', width: 100 },
                { field: 'Address', headerText: 'Address', width: 120 },
                { field: 'Country', headerText: 'Country', width: 100 }
            ]
        };
        public childGrid = {
            dataSource: orderDatas,
            queryString: 'EmployeeID',
            allowPaging: true,
            pageSettings: {pageSize: 6, pageCount: 5},
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'right', width: 120 },
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
                    <GridComponent dataSource={employeeData} childGrid={this.childGrid}  >
                        <ColumnsDirective>
                            <ColumnDirective field='EmployeeID' headerText='Employee ID' width='125' textAlign='right' />
                            <ColumnDirective field='FirstName' headerText='Name' width='125' />
                            <ColumnDirective field='Title' headerText='Title' width='180' />
                            <ColumnDirective field='HireDate' headerText='Hire Date' width='135' format={{ skeleton: 'yMd', type: 'date' }} textAlign='right' />
                            <ColumnDirective field='ReportsTo' headerText='Reports To' width='135' textAlign='right' />
                        </ColumnsDirective>
                        <Inject services={[DetailRow, Page]} />
                    </GridComponent>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Hierarchy />, document.getElementById('sample'));