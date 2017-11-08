import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject, FilterType } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

export class FilterMenu extends SampleBase<{}, {}> {

    private gridInstance: GridComponent;
    private filterType: { [key: string]: Object }[] = [
        { text: 'menu', value: 'menu' },
        { text: 'checkbox', value: 'checkbox' },
    ];
    public filterSettings: any = { type: 'menu' }
    private fields: Object = { text: 'text', value: 'value' };
    public onChange(sel: { itemData: { text: string, value: string } }): void {

        this.gridInstance.filterSettings.type = sel.itemData.value as FilterType;
        this.gridInstance.clearFiltering();
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div style={{ padding: '14px' }}>
                        <DropDownListComponent id="ddlelement" dataSource={this.filterType} fields={this.fields} change={this.onChange.bind(this)} index={0} popupHeight="150px" width="200px" />
                    </div>
                    <GridComponent dataSource={data.slice(0,200)} allowPaging={true} ref={grid => this.gridInstance = grid} pageSettings={{ pageSize: 10 }} allowFiltering={true} filterSettings={this.filterSettings}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' />
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Filter, Page]} />
                    </GridComponent>
                </div>

            </div>
        )
    }
}
ReactDOM.render(<FilterMenu />, document.getElementById('sample'));