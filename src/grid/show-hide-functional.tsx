import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Sort, Toolbar, ToolbarItems, FilterSettingsModel, EditSettingsModel, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import './sample.css';

function ShowHide() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const filterSettings: FilterSettingsModel = {type: 'Excel'};
    const toolbar: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const customeridRule: Object = { required: true, minLength: 5};
    const orderidRules: Object = { required: true, number: true };
    const freightRules: Object = { required: true, min: 0 };
    let flag: boolean = false;
    let gridInstance: GridComponent;
    let ToolbarInstance: ToolbarComponent;
    function click(e: MouseEvent): void {
        if (!flag) { return; }
        let element: HTMLElement = e.target as HTMLElement;

        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }

        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element) as HTMLElement;
        flag = false;
        let hidden: boolean = element.classList.contains('e-ghidden');
        let classFn: Function = hidden ? removeClass : addClass;
        const visibleColumns: HTMLElement[] = Array.from(ToolbarInstance.element.getElementsByClassName('e-tbar-btn-text'))
        .filter((item) => !((item as HTMLElement).classList.contains('e-ghidden'))) as HTMLElement[];
        const isLastVisibleColumn = visibleColumns.length === 1 && visibleColumns[0].parentElement === element.parentElement;
      
        if (hidden) {
          classFn([element], 'e-ghidden');
          gridInstance.showColumns(element.innerHTML);
        } else {
          if (isLastVisibleColumn) {
            alert("At least one column should be visible.");
            flag = true;
            return;
          }
          classFn([element], 'e-ghidden');
          gridInstance.hideColumns(element.innerHTML);
        }
        flag = true;
    }
    function dataBound(): void {
        flag = true;
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='e-statustext'>Select column name to toggle visibility</div>
                <ToolbarComponent id="toolbar" ref={toolbar => ToolbarInstance = toolbar} onClick={click.bind(this)} >
                    <ItemsDirective>
                        <ItemDirective text="Order ID" />
                        <ItemDirective text="Customer Name" />
                        <ItemDirective text="Freight" />
                        <ItemDirective text="Order Date" />
                        <ItemDirective text="Shipped Date" />
                        <ItemDirective text="Ship Country" />
                    </ItemsDirective>
                </ToolbarComponent>
                <br />
                <GridComponent dataSource={orderDetails} ref={grid => gridInstance = grid} dataBound={dataBound.bind(this)} allowPaging={true} allowSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} toolbar={toolbar}>
                    <ColumnsDirective>
                    <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign="Right" validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={customeridRule}></ColumnDirective>
                            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit'/>
                            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={freightRules} editType='numericedit'/>
                            <ColumnDirective field='ShippedDate' headerText='Shipped Date' width='130' format="yMd" textAlign="Right" editType='datepickeredit'></ColumnDirective>
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='170' editType='dropdownedit'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Sort, Toolbar, Filter, Edit]} />
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates dynamic show hide columns feature of Grid. Click column name from the toolbar to toggle visibility.
                </p>
            </div>
            <div id='description'>
                <p>
                    The Grid column can be showed/hidden dynamically using <code><a target='_blank' className='code'
                        href='https://ej2.syncfusion.com/react/documentation/api/grid/#showcolumns'>
                        ShowColumns</a></code> and <code><a target='_blank' className='code'
                            href='https://ej2.syncfusion.com/react/documentation/api/grid/#hidecolumns'>
                            hideColumns</a></code> method of the Grid.</p>

                <p>In this demo, the columns can be showed and hidden by clicking the column name in the toolbar. And the column`s visibility is toggled based on the <code><a target='_blank' className='code'
                    href='https://ej2.syncfusion.com/react/documentation/api/grid/column/#headertext'>
                    columns-&gt;headerText</a></code>value.</p>

                <p>The columns-&gt;visible property specifies the visibility of a column. To hide a column at the initial rendering, set the columns-&gt;visible property to false.</p>


            </div>
        </div>
    )
}
export default ShowHide;