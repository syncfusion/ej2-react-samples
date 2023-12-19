import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Edit, Toolbar, Page, Inject } from '@syncfusion/ej2-react-grids';
import { updateSampleSection } from '../common/sample-base';
import { DataManager } from '@syncfusion/ej2-data';
import { orderDataSource } from './data';
import './empty-record-template.css';

function EmptyRecordTemplate() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    
    function emptyMessageTemplate(): any {
        return (
            <div className='emptyRecordTemplate'>
                <img src="src/grid/images/emptyRecordTemplate.svg" className="e-emptyRecord" alt="No record"/>
                <span>There is no data available to display at the moment.</span>
            </div>
        );
    }
    
    const data: any = [];    
    const template: any = emptyMessageTemplate;
    const toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const orderidRules: Object = { required: true, number: true };
    const editparams: any = { params: { dataSource: new DataManager(orderDataSource), fields: { text: "ShipCountry", value: "ShipCountry"},} };
    const validationRule: Object = { required: true };
    const pageSettings: Object = { pageCount: 5 };
    const format: any = { type: 'dateTime', format: 'M/d/y hh:mm a' };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={data} emptyRecordTemplate={template.bind(this)} toolbar={toolbarOptions} allowPaging={true} editSettings={editSettings}  pageSettings={pageSettings}>
                <ColumnsDirective>
                    <ColumnDirective field='OrderID' headerText='Order ID' width='140' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
                    <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={validationRule}></ColumnDirective>
                    <ColumnDirective field='Freight' headerText='Freight' width='140' format='C2' textAlign='Right' editType='numericedit' ></ColumnDirective>
                    <ColumnDirective field='OrderDate' headerText='Order Date' editType='datetimepickeredit' format={format} width='160' ></ColumnDirective>
                    <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={editparams} ></ColumnDirective>
                </ColumnsDirective>
                    <Inject services={[Page, Edit, Toolbar]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the usage of the empty record template in the DataGrid. In this sample, we show a custom image in the place of the default no-record message typically shown by the DataGrid.</p>
            </div>
            <div id='description'>
                <p>The DataGrid provides a way to use a custom content when it has no data to present.
                    The <code>emptyRecordTemplate</code> property accepts either a string or an HTML element ID value, which will be used as the template when there's no data.</p>
                <p>
                    More information on the dataBinding feature configuration can be found in this
                    <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/grid/data-binding/data-binding'> documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default EmptyRecordTemplate;