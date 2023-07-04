import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject } from '@syncfusion/ej2-react-grids';
import { categoryData } from './data';
import { SampleBase } from '../common/sample-base';
import "./sample.css";
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { PropertyPane } from '../common/property-pane';
export class Filtering extends SampleBase<{}, {}> {

    private gridInstance: GridComponent;
    public checkboxObj: CheckBoxComponent;
    private filData: { [key: string]: Object }[] = [
        { id: '1', category: 'All' },
        { id: '2', category: 'Beverages' },
        { id: '3', category: 'Condiments' },
        { id: '4', category: 'Confections' },
        { id: '5', category: 'Dairy Products' },
        { id: '6', category: 'Grains/Cereals' },
        { id: '7', category: 'Meat/Poultry' },
        { id: '8', category: 'Produce' },
        { id: '9', category: 'Seafood' }
    ];
    private fields: Object = { text: 'category', value: 'id' };
    public onChange(sel: { itemData: { item: number, category: string } }): void {
        if (sel.itemData.category === 'All') {
            this.gridInstance.clearFiltering();
        } else {
            this.gridInstance.filterByColumn('CategoryName', 'equal', sel.itemData.category);
        }
    }
    public onChanged(args: ChangeEventArgs): void {
        if (args.checked) {
            this.gridInstance.filterSettings.showFilterBarOperator = true;
        }
        else {
            this.gridInstance.filterSettings.showFilterBarOperator = false;
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='col-lg-9 control-section'>
                    <div style={{ padding: '14px 0' }}>
                        <div className="select-wrap">
                            <DropDownListComponent id="ddlelement" dataSource={this.filData} fields={this.fields} change={this.onChange.bind(this)} placeholder="Select category to filter" width="200px" />
                        </div>
                    </div>
                    <GridComponent dataSource={categoryData} allowPaging={true} ref={grid => this.gridInstance = grid} pageSettings={{ pageSize: 10, pageCount: 5 }} allowFiltering={true}>
                        <ColumnsDirective>
                            <ColumnDirective field='CategoryName' headerText='Category Name' width='150'></ColumnDirective>
                            <ColumnDirective field='ProductName' headerText='Product Name' width='150'></ColumnDirective>
                            <ColumnDirective field='UnitsInStock' headerText='Units In Stock' width='150' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='Discontinued' headerText='Discontinued' width='150' textAlign='Center' displayAsCheckBox= {true} type='boolean' ></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Filter, Page]} />
                    </GridComponent>
                </div>

                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '70%' }}>
                                        <div>Enable Filterbar operator </div>
                                    </td>
                                    <td style={{ width: '30%', padding: '10px 10px 10px 0px' }}>
                                        <CheckBoxComponent ref={(scope) => { this.checkboxObj = scope; }} change={this.onChanged.bind(this)}></CheckBoxComponent>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>

                <div id="action-description">
                    <p>
                    This sample demonstrates the Grid's default filtering feature. Type a value in the filterbar and press enter to filter a particular column.
                    </p>
                </div>

                <div id='description'>
                    <p>The filtering feature enables the user to view a reduced amount of records based on filter criteria. It can be enabled
                        by setting the <code><a target='_blank' className='code'
                            href='http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowfiltering'>allowFiltering
                   </a></code> property to true. A filter bar row will be rendered next to header which allows users to filter
                        data by entering text within its cells.</p>
                    <p>The Filterbar uses two modes which specifies how to start filtering. They are,</p>
                    <ul>
                        <li><code>OnEnter</code> - Enabled by default, filter will be initiated when the <code>Enter</code> key is pressed.</li>
                        <li><code>Immediate</code> - Filter will start after user finishes typing. There will be a time delay of <i>1500ms</i> to initiate
                            filter after the user stops typing. It can be overridden using the <code><a target='_blank' className='code'
                                href='http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#filtersettings'>
                                filterSettings-&gt;immediateModeDelay
                        </a></code> property.</li>
                    </ul>
                    <p>In this demo, you can either select the <strong>Category Name</strong> from the SELECT element or type the text in the filter bar cells to filter.</p>
                     <p>Additionally, the records can also be filtered based on the selected filterbar operator. It can be enabled by setting
                    <br />
                        <code>filterSettings-&gt;showFilterBarOperator</code> property to true.
                     <p>In this demo,</p>
                     <ul>
                        <li>To enable or disable filterbar operator feature, check or uncheck the checkbox in the properties panel.</li>
                        <li>Select the required filtering operator in the dropdown list on the filter bar cell and type the text to start filtering.</li>
                        <li>Now, the addition of new filter operators such as "Does Not Contain", "Does Not End With", "Does Not Start With", "Empty", "Not Empty", "Null", "Not Null", "Like", and "Wildcard search" greatly enhance the filtering feature of the Grid.</li>
                    </ul>
                    <p>For example, when the <b>Like</b> search operator is used:</p>
                    <ul>
                        <li>%a% - Filters words containing the character 'a'</li>
                        <li>a%  - Filters words ending with 'a'</li>
                        <li>%a  - Filters words starting with 'a'</li>
                    </ul>
                    <p>For example when the <b>Wildcard</b> search operator is used:</p>
                    <ul>
                        <li>a*b - Filters words that start with 'a' and end with 'b'</li>
                    </ul>
                    </p>
                    <br />
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        GGrid features are segregated into individual feature-wise modules. To use filtering feature, inject the
                          <code>Filter</code> module using the <code>services</code>.
                   </p>
                    <p>
                        More information on the filter configuration can be found in this
                     <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/grid/filtering.html'>documentation section</a>.
                   </p> </div>
            </div>
        )
    }
}