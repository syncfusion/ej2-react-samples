import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Filter, Inject, FilterType } from '@syncfusion/ej2-react-grids';
import { updateSampleSection } from '../common/sample-base';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { Query, DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

function FilterMenu() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const SAMPLE_CSS = `
    span.e-input-group.e-ddl[aria-controls="ddlelement_popups"],
    span.e-input-group.e-ddl[aria-controls="ddlelement"] {
        margin-right: 15px;
    }`;
    let checkBoxInstance: CheckBoxComponent;
    const hostUrl: string = 'https://ej2services.syncfusion.com/react/release/';
    const data: DataManager = new DataManager({ url: hostUrl + 'api/UrlDataSource', adaptor: new UrlAdaptor  });
    const query: Query = new Query().addParams('dataCount', '10000');
    let gridInstance: GridComponent;
    const filterType: { [key: string]: Object }[] = [
        { text: 'Menu', value: 'Menu' },
        { text: 'Checkbox', value: 'CheckBox' },
        { text: 'Excel', value: 'Excel' },
    ];
    const filterSettings: any = { type: 'Menu' }
    const fields: Object = { text: 'text', value: 'value' };
    function onChange(sel: { itemData: { text: string, value: string } }): void {
        checkBoxInstance.checked = false;
        gridInstance.filterSettings.enableInfiniteScrolling = false;
        gridInstance.filterSettings.type = sel.itemData.value as FilterType;
        gridInstance.clearFiltering();
        if (gridInstance.filterSettings.type === 'Excel' || gridInstance.filterSettings.type === 'CheckBox') {
            checkBoxInstance.disabled = false;
        } else {
            checkBoxInstance.disabled = true;
        }
    }
    function checkboxOnChange(args: ChangeEventArgs): void {
        gridInstance.filterSettings.enableInfiniteScrolling = args.checked;
    }
    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div style={{ padding: '14px' }}>
                    <DropDownListComponent id="ddlelement" dataSource={filterType} fields={fields} change={onChange.bind(this)} index={0} popupHeight="150px" width="200px" />
                    <CheckBoxComponent ref={checkBox => checkBoxInstance = checkBox} label='Enable OnDemand: ' labelPosition='Before' disabled={true} change={checkboxOnChange.bind(this)}></CheckBoxComponent>
                </div>
                <GridComponent  dataSource={data} query={query} allowSorting={true} allowPaging={true} ref={grid => gridInstance = grid} pageSettings={{ pageSize: 10, pageCount: 5 }} allowFiltering={true} filterSettings={filterSettings}>
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
                <p>
                    More information on the filter configuration can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/grid/#filtersettings"> documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default FilterMenu;
