import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject } from '@syncfusion/ej2-react-grids';
import { categoryData } from './data';
import { SampleBase } from '../common/sample-base';
import "./sample.css";
export class Filtering extends SampleBase<{}, {}> {

    private gridInstance: GridComponent;
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
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div style={{ padding: '14px 0' }}>
                        <div className="select-wrap">
                            <DropDownListComponent id="ddlelement" dataSource={this.filData} fields={this.fields} change={this.onChange.bind(this)} placeholder="Select category to filter" width="200px" />
                        </div>
                    </div>
                    <GridComponent dataSource={categoryData} allowPaging={true} ref={grid => this.gridInstance = grid} pageSettings={{ pageSize: 10, pageCount: 5 }} allowFiltering={true}>
                        <ColumnsDirective>
                            <ColumnDirective field='CategoryName' headerText='Category Name' width='170'></ColumnDirective>
                            <ColumnDirective field='ProductName' headerText='Product Name' width='150'></ColumnDirective>
                            <ColumnDirective field='QuantityPerUnit' headerText='Quantity PerUnit' width='180' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='UnitsInStock' headerText='Units In Stock' width='150' textAlign='Right'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Filter, Page]} />
                    </GridComponent>
                </div>

                <div id="action-description">
                    <p>
                        This sample demonstrates the Grid Default Filtering feature. In this sample, type the value in the
                        filterbar and press enter to filter particular column.
                    </p>
                </div>

                <div id='description'>
                    <p>The filtering feature enables the user to view the reduced amount of records based on filter criteria.
                    It can be enabled by setting <code><a target='_blank' className='code'
                            href='http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowfiltering-boolean'>allowFiltering
                   </a></code> property as true.
                    A filter bar row will be rendered next to header which allows the end-users to filter data by entering text within its cells.</p>
                    <p>Filterbar uses two modes which specifies how to start filtering. They are,</p>
                    <ul>
                        <li><code>OnEnter</code> - Enabled by default, filter will be initiated after pressing <code>Enter</code> key.</li>
                        <li><code>Immediate</code> - Filter will start after user ends typing. This uses a time delay of <i>1500ms</i>
                            to initiate filter after use stops typing.
                           It can be overridden using the <code><a target='_blank' className='code'
                                href='http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#filtersettings-filtersettingsmodel'>
                                filterSettings->immediateModeDelay
                        </a></code> property.</li>
                    </ul>
                    <p>In this demo, you can either select the <strong>Category Name</strong> from the SELECT element or type the text in the
                     filter bar cells to filter the Grid. </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid component features are segregated into individual feature-wise modules. To use filtering feature, we need to inject
                          <code>Filter</code> module into the <code>services</code>.
                   </p>
                    <p>
                        More information on the filter configuration can be found in this
                     <a target='_blank' href='http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#filtersettings-filtersettingsmodel'>documentation section</a>.
                   </p> </div>
            </div>
        )
    }
}