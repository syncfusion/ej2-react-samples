import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Filter, Inject, FilterType } from '@syncfusion/ej2-react-grids';
import { orderDataSource } from './data';
import { updateSampleSection } from '../common/sample-base';

function FilterMenu() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let gridInstance: GridComponent;
    const filterType: { [key: string]: Object }[] = [
        { text: 'Menu', value: 'Menu' },
        { text: 'Checkbox', value: 'CheckBox' },
        { text: 'Excel', value: 'Excel' },
    ];
    const filterSettings: any = { type: 'Menu' }
    const fields: Object = { text: 'text', value: 'value' };
    const format: any = { type: 'datetime', format: 'M/d/y hh:mm a' };
    function onChange(sel: { itemData: { text: string, value: string } }): void {

        gridInstance.filterSettings.type = sel.itemData.value as FilterType;
        gridInstance.clearFiltering();
    }
    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <div style={{ padding: '14px' }}>
                    <DropDownListComponent id="ddlelement" dataSource={filterType} fields={fields} change={onChange.bind(this)} index={0} popupHeight="150px" width="200px" />
                </div>
                <GridComponent dataSource={orderDataSource} allowSorting={true} allowPaging={true} ref={grid => gridInstance = grid} pageSettings={{ pageSize: 10, pageCount: 5 }} allowFiltering={true} filterSettings={filterSettings}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer Name' width='150'></ColumnDirective>
                        <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format={format} textAlign='Right' />
                        <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' />
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Filter, Page, Sort]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>
                This sample demonstrates filtering Grid columns using menu, checkbox, and Excel filter UI.
                In this sample, click the filter icon on the column header to filter a particular column.
                You can change the filter type on the properties panel. When Excel filter type is selected, you can sort the column using the sort option in the Excel filter dialog.
                </p>
            </div>

            <div id='description'>
                <p>The filtering feature enables the user to view a reduced number of records based on the filter criteria. It can be enabled by setting the <code><a target='_blank' className='code'
                        href='https://ej2.syncfusion.com/react/documentation/api/grid/#allowfiltering'>allowFiltering
                    </a></code> property to true.</p>
                <p>Grid supports the following filter types.</p>
                <ul>
                    <li><code>FilterBar</code></li>
                    <li><code>Menu</code></li>
                    <li><code>CheckBox</code></li>
                    <li><code>Excel</code></li>
                </ul>
                <p>
                you can change the filter type by setting <code><a target='_blank' className='code'
                        href='https://ej2.syncfusion.com/react/documentation/api/grid/filterSettings/#type'>
                        filterSettings-&gt;type</a>
                    </code>
                </p>
                <p>Now, the following additional filter operators are incorporated with the already existing operators.</p>
                <p>String type columns:</p>
                <ul>
                    <li>Not Equal</li>
                    <li>Does Not Start With</li>
                    <li>Does Not End With</li>
                    <li>Does Not Contain</li>
                    <li>Empty</li>
                    <li>Not Empty</li>
                    <li>Like</li>
                </ul>
                <p>Number and Date type columns:</p>
                <ul>
                    <li>Null</li>
                    <li>Not Null</li>
                </ul>
                <p>For example, when the <b>Like</b> search operator is used:</p>
                <ul>
                    <li>%a% - Filters words containing the character 'a'</li>
                    <li>a%  - Filters words ending with 'a'</li>
                    <li>%a  - Filters words starting with 'a'</li>
                </ul>
            </div>
        </div>
    )
}
export default FilterMenu;
