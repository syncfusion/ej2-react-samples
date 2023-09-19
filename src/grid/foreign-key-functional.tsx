import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
    GridComponent, ColumnsDirective, ColumnDirective, Page, Filter,
    Inject, Edit, Sort, ForeignKey, Toolbar
} from '@syncfusion/ej2-react-grids';
import { orderDetails, customerData } from './data';
import { updateSampleSection } from '../common/sample-base';

function ForeignKeyColumn() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let gridInstance: GridComponent;
    const toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const validationRules = { required: true };
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={orderDetails} allowPaging={true} ref={grid => gridInstance = grid} allowFiltering={true}
                    allowSorting={true} editSettings={{ allowEditing: true, allowDeleting: true, allowAdding: true }}
                    filterSettings={{ type: 'Menu' }} toolbar={toolbarOptions}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right'
                            validationRules={validationRules} isPrimaryKey={true}></ColumnDirective>
                        <ColumnDirective field='CustomerID' headerText='Customer Name' width='150' validationRules={validationRules}
                            foreignKeyValue='ContactName' foreignKeyField='CustomerID' dataSource={customerData}></ColumnDirective>
                        <ColumnDirective field='Freight' headerText='Freight' width='150' format='C2' textAlign='Right' editType='numericedit' />
                        <ColumnDirective field='ShipName' headerText='Ship Name' width='170'></ColumnDirective>
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' ></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Filter, Page, Edit, Sort, ForeignKey, Toolbar]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>
                    In this sample,<b>Customer Name</b>column is a foreign column.
                    You can perform filtering, sorting or editing in the foreign key column.
                </p>
            </div>

            <div id='description'>
                <p>
                    Grid has option to show foreign key columns. It can be enabled by setting
                    <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#datasource">column.dataSource </a></code>
                    property with either local or remote data and column field and text can be defined by using
                    <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#foreignkeyfield">column.foreignKeyField</a></code> and
                    <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/column/#foreignkeyvalue">column.foreignKeyValue</a></code> properties.
                </p>

                <p style={{ fontWeight: 500 }}><b>Injecting Module:</b></p>
                <p>
                    Grid features are segregated into individual feature-wise modules. To use foreign key column feature, we need to
                    inject <code> ForeignKey </code> module into the <code>services</code>.
                </p>
            </div>
        </div>
    );
}
export default ForeignKeyColumn;