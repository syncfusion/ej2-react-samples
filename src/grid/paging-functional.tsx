import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { L10n } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Sort, Toolbar, ToolbarItems, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { data } from './data';
import { updateSampleSection } from '../common/sample-base';
import './paging.css';

L10n.load({
    'en-US': {
        'pager': {
            'currentPageInfo': '',
            'totalItemsInfo': '{1} to {2} of {0}',
        }
    }
});

function Paging() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const filterSettings: FilterSettingsModel = {type: 'Excel'};
    const toolbar: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const customeridRule: Object = { required: true, minLength: 5};
    const orderidRules: Object = { required: true, number: true };
    const freightRules: Object = { required: true, min: 0 };
    return (
        <div className='control-pane'>
            <div className='control-section paging-api'>
                <GridComponent dataSource={data} locale='en-US' allowPaging={true} allowSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} toolbar={toolbar} height={365} pageSettings={{ pageCount: 4, pageSizes: true }}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={customeridRule}></ColumnDirective>
                        <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit'/>
                        <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={freightRules} editType='numericedit'/>
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='170' editType='dropdownedit'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Sort, Toolbar, Filter, Edit]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the Grid paging feature. In this sample, click the numeric items to navigate to
                    particular page. You can also change the page size using the dropdown.
                </p>
            </div>
            <div id='description'>
                <p>
                    Paging allows you to display the contents of the Grid component in page segments.
                    By default, paging is disabled. To enable paging, set <code><a target='_blank' className='code'
                        href='https://ej2.syncfusion.com/react/documentation/api/grid/#allowpaging'>
                        allowPaging</a></code> property to true.
                    <code><a target='_blank' className='code'
                        href='https://ej2.syncfusion.com/react/documentation/api/grid/pageSettings/#pagesizes'>
                        pageSettings-&gt;pagesizes</a></code>property enables a dropdown in pager which allows you to change the number of records in the Grid dynamically.
                </p>
                <p>
                    In this demo, the Grid is rendered with
                    <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid/pageSettings/#pagesizes">
                        pageSettings-&gt;pageSizes
                    </a></code> set to true and
                    <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid/pageSettings/#pagecount">
                        pageSettings-&gt;pageCount
                    </a></code> set to 4.
                </p>
        <p>
            The Pager component has been enhanced to be more responsive. 
            It now includes the ability to automatically resize itself and dynamically show or hide pager items based on the width of the Grid.
        </p> 
                <p>Changed default pager details information using the <code>totalItemsInfo</code> locale property.</p>
                <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                <p>
                    Grid component features are segregated into individual feature-wise modules. To use paging feature, we need to inject <code>Page</code> module into the <code>services</code>.</p>
                <p>
                    More information on the paging feature configuration can be found in this
                    <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/grid/paging.html'> documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Paging;