import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Sort, Toolbar, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { updateSampleSection } from '../common/sample-base';
import './sample.css';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

function RowHeight() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    /**
     * Row height sample
     */
    const filterSettings: FilterSettingsModel = {type: 'Excel'};
    const editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const customeridRule: Object = { required: true, minLength: 5};
    const orderidRules: Object = { required: true, number: true };
    const freightRules: Object = { required: true, min: 0 };
    const toolbarOptions: any = [ 'Add', 'Edit', 'Delete', 'Update', 'Cancel', 
        { prefixIcon: 'e-small-icon', id: 'big', align: 'Right', tooltipText: 'Row-height-big' },
        { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right', tooltipText: 'Row-height-medium' },
        { prefixIcon: 'e-big-icon', id: 'small', align: 'Right', tooltipText: 'Row-height-small' }];
    let gridInstance: GridComponent;
    function clickHandler(args: ClickEventArgs) {
        if (args.item.id === 'small') {
            gridInstance.rowHeight = 20;
        }
        if (args.item.id === 'medium') {
            gridInstance.rowHeight = 40;
        }
        if (args.item.id === 'big') {
            gridInstance.rowHeight = 60;
        }
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={orderDetails} ref={grid => gridInstance = grid} allowSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} rowHeight={20} height={400} toolbar={toolbarOptions} toolbarClick={clickHandler.bind(this)}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={customeridRule} ></ColumnDirective>
                        <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit'/>
                        <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={freightRules} editType='numericedit'/>
                        <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='140' format='yMd' textAlign='Right' editType='datepickeredit'/>
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit'/>
                    </ColumnsDirective>
                    <Inject services={[Toolbar, Sort, Filter, Edit]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the row height feature of the Grid. In this demo, the <b>rowHeight</b> for all the Grid rows can be
                    changed as <b>20px</b>, <b>40px</b> and <b>60px</b> on ToolBar button click.</p>
            </div>
            <div id='description'>
                <p>
                    The Grid has support to provide <code><a target='_blank' className='code'
                        href='https://ej2.syncfusion.com/react/documentation/api/grid/#rowheight'>
                        rowHeight</a></code> property.</p>
            </div>
        </div>
    )
}
export default RowHeight;
