import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Filter, Inject, FilterType } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { Query, DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const SAMPLE_CSS = `
span.e-input-group.e-ddl[aria-controls="ddlelement_popups"],
span.e-input-group.e-ddl[aria-controls="ddlelement"] {
    margin-right: 15px;
}`;
export class FilterMenu extends SampleBase<{}, {}> {

    private gridInstance: GridComponent;
    private checkBoxInstance: CheckBoxComponent;
    public hostUrl: string = 'https://ej2services.syncfusion.com/react/release/';
    public data: DataManager = new DataManager({ url: this.hostUrl + 'api/UrlDataSource', adaptor: new UrlAdaptor  });
    public query: Query = new Query().addParams('dataCount', '10000');
    private filterType: { [key: string]: Object }[] = [
        { text: 'Menu', value: 'Menu' },
        { text: 'Checkbox', value: 'CheckBox' },
        { text: 'Excel', value: 'Excel' },
    ];
    public filterSettings: any = { type: 'Menu' }
    private fields: Object = { text: 'text', value: 'value' };
    public onChange(sel: { itemData: { text: string, value: string } }): void {
        this.checkBoxInstance.checked = false;
        this.gridInstance.filterSettings.enableInfiniteScrolling = false; 
        this.gridInstance.filterSettings.type = sel.itemData.value as FilterType;
        this.gridInstance.clearFiltering();
        if (this.gridInstance.filterSettings.type === 'Excel' || this.gridInstance.filterSettings.type === 'CheckBox') {
            this.checkBoxInstance.disabled = false;
        } else {
            this.checkBoxInstance.disabled = true;
        }
    }
    public checkboxOnChange(args: ChangeEventArgs): void {
        this.gridInstance.filterSettings.enableInfiniteScrolling = args.checked; 
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <style>
                        {SAMPLE_CSS}
                    </style>
                    <div style={{ padding: '14px' }}>
                        <DropDownListComponent id="ddlelement" dataSource={this.filterType} fields={this.fields} change={this.onChange.bind(this)} index={0} popupHeight="150px" width="200px" />
                        <CheckBoxComponent ref={checkBox => this.checkBoxInstance = checkBox} disabled={true} label='Enable OnDemand: ' labelPosition='Before' change={this.checkboxOnChange.bind(this)}></CheckBoxComponent>
                    </div>
                    <GridComponent dataSource={this.data} query={this.query} allowSorting={true} allowPaging={true} ref={grid => this.gridInstance = grid} pageSettings={{ pageSize: 10, pageCount: 5 }} allowFiltering={true} filterSettings={this.filterSettings}>
                        <ColumnsDirective>
                        <ColumnDirective field='EmployeeID' headerText='Employee ID' width='120' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='Employees' headerText='Employee Name' width='150'></ColumnDirective>
                        <ColumnDirective field='Designation' headerText='Designation' width='130' textAlign='Right' />
                        <ColumnDirective field='CurrentSalary' headerText='CurrentSalary' width='120' format='C2' textAlign='Right' />
                        </ColumnsDirective>
                        <Inject services={[Filter, Page, Sort]} />
                    </GridComponent>
                </div>
                <div id="action-description">
                    <p>
                    This sample demonstrates the grid's multiple-type filter functionality and user interface.
                    </p>
                </div>

                <div id='description'>
                    <p>The filtering feature enables the user to view a reduced number of records based on the filter criteria. It can be enabled by setting the <code><a target='_blank' className='code'
                            href='https://ej2.syncfusion.com/react/documentation/api/grid/#allowfiltering'>allowFiltering
                   </a></code> property to true.</p>
                    <p>The grid supports the following filter types:</p>
                    <ul>
                        <li><code>FilterBar</code></li>
                        <li><code>Menu</code></li>
                        <li><code>CheckBox</code></li>
                        <li><code>Excel</code></li>
                    </ul>
                    <p>
                        You can change the filter type by setting <code><a target='_blank' className='code'
                        href='https://ej2.syncfusion.com/react/documentation/api/grid/filterSettings/#type'>
                        filterSettings-&gt;type</a>
                        </code>.
                    </p>
                    <p>In this demo, the filter menu is enabled by default. You can switch to other filter types using the dropdown.</p>
                    <p>Additionally, we have an on-demand data fetch functionality and UI for the checkbox/Excel filter type. It can be enabled by setting the <code><a target="_blank" className="code"
                        href="">filterSettings-&gt;enableInfiniteScrolling</a></code> property to true. In this demo, on-demand data fetch is not enabled by default. To enable the on-demand data fetch for the checkbox/Excel filter type, the Enable OnDemand option must be checked after selecting the checkBox/Excel filter type using the dropdown menu.</p>
                    <p>More information on the filter configuration can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/grid/#filtersettings"> documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}
