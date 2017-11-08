import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, RowSelectEventArgs, Selection, Inject } from '@syncfusion/ej2-react-grids';
import { customerData, data } from '../data';
import { SampleBase } from './sample-base';


type carType = { CustomerID: string, CustomerName: string, ContactName: string };

export class MasterDetail extends SampleBase<{}, {}> {

    public key: any = null;
    public detail: Object = [];
    public detailGrid: GridComponent;
    public names: string[] = ['AROUT', 'BERGS', 'BLONP', 'CHOPS', 'ERNSH'];
    public master: Object = customerData.filter((e: carType) => this.names.indexOf(e.CustomerID) !== -1);;
    public rowselect(args: RowSelectEventArgs): void {
        let selRecord: carType = args.data as carType;
        let selecteMessage: any = document.getElementsByClassName('e-statustext')[0];
        let message: HTMLElement = selecteMessage.querySelector('b')
        message.textContent = selRecord.ContactName;
        this.detailGrid.dataSource = data.filter((record: carType) => record.CustomerName === selRecord.ContactName).slice(0, 5);
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={this.master} selectedRowIndex={2} rowSelected={this.rowselect.bind(this)}>
                        <ColumnsDirective>
                            <ColumnDirective field='ContactName' headerText='Customer Name' width='150'></ColumnDirective>
                            <ColumnDirective field='CompanyName' headerText='Company Name' width='150'></ColumnDirective>
                            <ColumnDirective field='Address' headerText='Address' width='150' />
                            <ColumnDirective field='Country' headerText='Country' width='130' />
                        </ColumnsDirective>
                        <Inject services={[Selection]} />
                    </GridComponent>

                    <div className='e-statustext'> Showing orders of Customer:  <b></b></div>

                    <GridComponent dataSource={this.detail} allowSelection={false} ref={grid => this.detailGrid = grid}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='100' ></ColumnDirective>
                            <ColumnDirective field='Freight' headerText='Freight' width='100' format='C2' type='number' />
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
                        </ColumnsDirective>
                    </GridComponent>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<MasterDetail />, document.getElementById('sample'));