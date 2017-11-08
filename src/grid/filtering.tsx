import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject } from '@syncfusion/ej2-react-grids';
import { categoryData } from './data';
import { SampleBase } from '../common/sample-base';
import "./sample.css";
export class Filtering extends SampleBase<{}, {}> {

    private gridInstance: GridComponent;
    public onChange(): void {
        if ((document.getElementById('ddl') as HTMLInputElement).value === 'All') {
            this.gridInstance.clearFiltering();
        } else {
            this.gridInstance.filterByColumn('CategoryName', 'equal', (document.getElementById('ddl') as HTMLInputElement).value);
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div style={{ padding: '14px 0' }}>
                        <div className="select-wrap">
                            <select id='ddl' onChange={this.onChange.bind(this)} >
                                <option disabled selected hidden>Select category to filter</option>
                                <option value="All">ALL</option>
                                <option value="Beverages">Beverages</option>
                                <option value="Confections">Confections</option>
                                <option value="Dairy Products">Dairy Products</option>
                                <option value="Grains/Cereals">Grains/Cereals</option>
                                <option value="Meat/Poultry">Meat/Poultry</option>
                                <option value="Produce">Produce</option>
                                <option value="Seafood">Seafood</option>
                            </select>
                        </div>                    
                        </div>
                    <GridComponent dataSource={categoryData} allowPaging={true} ref={grid => this.gridInstance = grid} pageSettings={{ pageSize: 10 }} allowFiltering={true}>
                        <ColumnsDirective>
                            <ColumnDirective field='CategoryName' headerText='Category Name' width='170'></ColumnDirective>
                            <ColumnDirective field='ProductName' headerText='Product Name' width='150'></ColumnDirective>
                            <ColumnDirective field='QuantityPerUnit' headerText='Quantity PerUnit' width='180' textAlign='right'></ColumnDirective>
                            <ColumnDirective field='UnitsInStock' headerText='Units In Stock' width='150' textAlign='right'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Filter, Page]} />
                    </GridComponent>
                </div>
                <div id='description'>
                    <p>The filtering feature enables the user to view the reduced amount of records based on filter criteria.
                    It can be enabled by setting <code><a target='_blank' className='code'
                            href='http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowfiltering-boolean'>allowFiltering
                   </a></code> property as true.
                    A filter bar row will be rendered next to header which allows the end-users to filter data by entering text within its cells.</p>
                    <p>Filterbar uses two modes which specifies how to start filtering. They are,</p>
                    <ul>
                        <li><code>onenter</code> - Enabled by default, filter will be initiated after pressing <code>Enter</code> key.</li>
                        <li><code>immediate</code> - Filter will start after user ends typing. This uses a time delay of <i>1500ms</i>
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