import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeView, TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Resize, Sort, Toolbar, ColumnChooser, ToolbarItems, FilterSettingsModel, EditSettingsModel, Filter, Edit, ColumnModel, ColumnChooserSettingsModel } from '@syncfusion/ej2-react-grids';
import { stackedHeaderData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import './stacked-header.css';

function StackedHeader() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    function HeaderTemplate(): any {
        return (
            <div>
              <span className="e-icons e-columns" id="column-chooser-icon" style={{ position: 'relative', top: '2px' }}></span> 
              <span id="column-chooser-text" style={{ position: 'relative', left: '5px' }}>Column Options</span>
            </div>
        );
    }
    
    function Template(props: any): any {
        const parentNodes = [
            { id: 1, name: 'Order Details', hasChild: true, expanded: true },
            { id: 2, name: 'Shipping Details', hasChild: true, expanded: true },
            { id: 3, name: 'Delivery Status', hasChild: true, expanded: true },
        ];
        let treeData: { [key: string]: Object }[]= []; 
        
        if (props.columns && props.columns.length) {
            treeData = props.columns.map((column: ColumnModel) => {
                let parentId: any;
                switch (column.field) {
                    case 'OrderID':
                    case 'OrderDate':
                        parentId = 1;
                        break;
                    case 'ShipCountry':
                    case 'Freight':
                        parentId = 2;
                        break;
                    case 'Status':
                    case 'Feedback':
                        parentId = 3;
                        break;
                    default :
                        break;
                }
                return {
                    id: column.uid,
                    name: column.headerText,
                    pid: parentId,
                    isChecked: column.visible
                };
            });
            const uniquePids: string[] = [];
            treeData.forEach((item: any) => {
                if (!uniquePids.includes(item.pid)) {
                    uniquePids.push(item.pid);
                }
            });
            const filteredParents = parentNodes.filter((parent: any) => uniquePids.includes(parent.id));
            treeData.push(...filteredParents);
        } else {
            treeData = [];
        }

        const fields = { dataSource: treeData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
        const enableRTL = gridInstance.enableRtl ? true : false;

        React.useEffect (() => {
            if (treeObj) {
                treeObj.setProperties({fields});
            }
          },[props.columns]);
        
        return (
            <div>
                { props.columns && props.columns.length ? (<TreeViewComponent fields={fields} cssClass="no-border" enableRtl={enableRTL} showCheckBox={true} nodeClicked={nodeCheck.bind(this)} keyPress={nodeCheck.bind(this)}  ref={(treeview) => { treeObj = treeview; }} />) : (<div className="no-record-text">No Matches Found</div>)}
            </div>
        );
    }

    function FooterTemplate(): any {
        return (
            <div id="columnChooserFooter">
              <ButtonComponent onClick={columnChooserSubmit}>Apply</ButtonComponent>
              <ButtonComponent onClick={columnChooserClose}>Close</ButtonComponent>
            </div>
        );
    }

    function nodeCheck(args: any): void {
        let checkedNode: any = [args.node];
        if (args.event.target.classList.contains('e-fullrow') || args.event.key == "Enter") {
           let getNodeDetails: any = treeObj.getNode(args.node);
            if (getNodeDetails.isChecked == 'true') {
                treeObj.uncheckAll(checkedNode);
            } else {
                treeObj.checkAll(checkedNode);
            }
        }
    }

    function queryCellInfo(args: any) {
        if (args.column.field === 'Status') {
            if (args.data['Status'] === 'Delivered') {
                args.cell.classList.remove('e-inprogress');
                args.cell.classList.add('e-delivered');
            } else {
                args.cell.classList.remove('e-delivered');
                args.cell.classList.add('e-inprogress');
            }
        }
    }
  
    function feedbackTemplate(props: any) {
        return (
        <div>
            <RatingComponent
            value={props.Feedback}
            cssClass={'custom-rating'}
            readOnly={true}
            />
        </div>
        );
    }
      
    function locationtemplate(props: any) {
        return (
            <div className="Mapimage">
            <img
                src="https://ej2.syncfusion.com/react/demos/src/grid/images/Map.png"
                className="e-image"
                alt=""
            />{' '}
            <span> </span>
            <span id="locationtext">{props.ShipCountry}</span>
            </div>
        );
    }
    
    function columnChooserClose() {
        (gridInstance.columnChooserModule as any).hideDialog();
    }

    function columnChooserSubmit() {
        const checkedElements: any = [];
        const uncheckedElements: any = [];
        var showColumns: any = gridInstance.getVisibleColumns().filter(function (column: any) { return (column.showInColumnChooser === true); });
        showColumns = showColumns.map(function (col: any) { return col.headerText; });
        const treeItems = document.querySelectorAll('.e-list-item');
    
        treeItems.forEach(item => {
            const itemDetails = treeObj.getNode(item);
            if (!itemDetails.hasChildren) {
            if (item.getAttribute('aria-checked') === 'true') {
                checkedElements.push(itemDetails.text);
            } else {
                uncheckedElements.push(itemDetails.text);
            }
            }
        });
        showColumns = showColumns.filter((col: any) => !uncheckedElements.includes(col));
        checkedElements.forEach(item => {
        if (!showColumns.includes(item)) {
            showColumns.push(item);
        }
        });
        var columnsToUpdate: any = { visibleColumns: showColumns, hiddenColumns: uncheckedElements };
        gridInstance.columnChooserModule.changeColumnVisibility(columnsToUpdate);
    }
  
    let treeObj: TreeView;
    let gridInstance: GridComponent;
    const filterSettings: FilterSettingsModel = {type: 'Excel'};
    const toolbar: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ColumnChooser'];
    const editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const orderidRules: Object = { required: true, number: true };
    const columnChooserSettings: ColumnChooserSettingsModel = { template: Template, headerTemplate: HeaderTemplate, footerTemplate: FooterTemplate }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={stackedHeaderData} ref={(grid) => { gridInstance = grid }} allowPaging={true} allowResizing={true} enableHover={false} clipMode="EllipsisWithTooltip" allowSorting={true} allowMultiSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} toolbar={toolbar} queryCellInfo={queryCellInfo} showColumnChooser={true} columnChooserSettings={columnChooserSettings}>
                    <ColumnsDirective>
                        <ColumnDirective field='CustomerID' headerText='Customer ID' width='160' minWidth='115' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true} showInColumnChooser={false}></ColumnDirective>
                        <ColumnDirective field='CustomerName' headerText='Name' width='150' minWidth='120'></ColumnDirective>
                        <ColumnDirective columns={
                            [
                            { field: 'OrderID', headerText: 'ID', textAlign: 'Right', width: 90, minWidth: 90 },
                            { field: 'OrderDate', headerText: 'Date', textAlign: 'Right', width: 110, minWidth: 105, format: 'yMd', editType: 'datepickeredit' }
                            ]}
                            headerText='Order Details'
                            textAlign='Center'/>
                        <ColumnDirective columns={
                            [
                            { field: 'ShipCountry', headerText: 'Country', textAlign: 'Left', width: 150, minWidth: 120, editType: 'dropdownedit', template: locationtemplate, validationRules: { required: true } },
                            { field: 'Freight', headerText: 'Charges', textAlign: 'Right', width: 130, minWidth: 115, format: 'C2', editType: 'numericedit', validationRules: { required: true, number: true } },
                            ]}
                            headerText='Shipping Details'
                            textAlign='Center'/>
                        <ColumnDirective columns={
                            [
                                { field: 'Status', headerText: 'Status', textAlign: 'Center', width: 150, minWidth: 120, editType: 'dropdownedit', validationRules: { required: true, } },
                                { field: 'Feedback', headerText: 'Feedback', allowResizing: false, textAlign: 'Center', width: 130, minWidth: 115, template: feedbackTemplate, editType: 'numericedit', validationRules: { required: true, min: 0, max: 5 },}
                            ]}
                            headerText='Delivery Status'
                            textAlign='Center'/>
                    </ColumnsDirective>
                <Inject services={[Page, Resize, Sort, Toolbar, Filter, Edit, ColumnChooser]} />
                </GridComponent>
            </div>
            <div id="action-description">
            <p>This example showcases the Syncfusion EJ2 Grid component which features stacked headers, column resizing, and a customizable column chooser template.</p>
            </div>
            <div id='description'>
                <p><b>Stacked Headers:</b></p>
                <p>The Grid allows grouping columns to display multiple levels of headers using the <code><a target='_blank' className='code'
                    href='https://ej2.syncfusion.com/react/documentation/api/grid#columns'> columns</a></code> property.</p>
                <p>In this demo, the columns are grouped as follows:</p>
                <ul>
                    <li><b>Order Details</b>: ID and Date</li>
                    <li><b>Shipping Details</b>: Country and Charges </li>
                    <li><b>Delivery Status</b>: Status and Feedback</li>
                </ul>
                <br/>
                <p><b>Column Resizing:</b></p>
                <p> 
                    Columns can be resized by clicking and dragging the right edges of the column header. To enable this feature, set
                    <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid#allowresizing">allowResizing </a></code> to true.
                    to true. To disable resizing for specific columns, set
                    <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/column#allowresizing">columns-&gt;allowResizing </a></code> 
                    to false.
                </p>
                <br/>
                <p><b>Column Chooser Templates:</b></p>
                <p>The column chooser template is used to customize layout and manage column visibility.</p>
                <p>Key properties: </p>
                <ul>
                    <li>
                        <code>columnChooserSettings-&gt;headerTemplate </code> :- Defines the header template.
                    </li>
                    <li>
                        <code>columnChooserSettings-&gt;template </code> :- Defines the content template.
                    </li>
                    <li>
                        <code>columnChooserSettings-&gt;footerTemplate </code> :- Defines the footer template.
                    </li>
                    <li>
                        <code>columnChooserSettings-&gt;enableSearching </code> :- Enables or disables search functionality.
                    </li>
                </ul>
                <p>In this demo, the <code> showInColumnChooser </code> of the <b>Customer ID</b> column is set to false, preventing it from being displayed in the column chooser popup.</p>
                <br/>
                <br/>
                <p> More information on the Stacked Header feature configuration can be found in this
                    <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/grid/columns/#resize-stacked-column'> documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default StackedHeader;
