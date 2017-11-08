import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Filter, Inject } from '@syncfusion/ej2-react-grids';
import { categoryData } from '../data';
import { SampleBase } from './sample-base';

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
            </div>
        )
    }
}
ReactDOM.render(<Filtering />, document.getElementById('sample'));