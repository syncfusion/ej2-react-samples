import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject, FilterType } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { SampleBase } from '../common/sample-base';

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
                <div id="action-description">
                    <p>
                        This sample demonstrates the way of filtering Grid columns using menu and checkbox filter UI. In this sample,
                        click the filtering icon from column header to show filter UI for a particular column. You can change
                        the filter type from the dropdown.
                    </p>
                </div>

                <div id='description'>
                    <p>The filtering feature enables the user to view the reduced amount of records based on filter criteria.
                    It can be enabled by setting <code><a target='_blank' className='code'
                            href='http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowfiltering-boolean'>allowFiltering
                   </a></code> property as true.</p>
                    <p>Grid supports the following filter types.  They are, </p>
                    <ul>
                        <li><code>filter bar</code></li>
                        <li><code>menu</code></li>
                        <li><code>check box</code></li>
                    </ul>
                    <p>
                        you can enale the filter type by setting <code><a target='_blank' className='code'
                        href='http://ej2.syncfusion.com/documentation/grid/api-filterSettings.html?lang=typescript#type-string'>
                        filterSettings->type</a>
                        </code>
                    </p>
                </div>
            </div>
        )
    }
}