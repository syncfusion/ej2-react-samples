import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, NewRowPosition, Sort} from '@syncfusion/ej2-react-grids';
import { orderDataSource } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

export class NormalEdit extends SampleBase<{}, {}> {
  public toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, showAddNewRow: true, newRowPosition: 'Top' };
  public editparams: any = { params: { popupHeight: '300px' } };
  public customeridRule: Object = { required: true, minLength: 5};
  public freightRule: Object = { required: true, min: 0};
  public orderidRules: Object = { required: true, number: true };
  public pageSettings: Object = { pageCount: 5};
  public format: any = {type:'dateTime',format:'M/d/y hh:mm a'};

	private gridInstance: GridComponent;
	private dropDownInstance: DropDownListComponent;
  private droplist: { [key: string]: Object }[] = [
		{ text: 'Top', value: 'Top' },
		{ text: 'Bottom', value: 'Bottom' }
  ];

  actionBegin(args: any): void {
      if (args.requestType === 'save') {
        if (this.gridInstance.pageSettings.currentPage !== 1 && this.gridInstance.editSettings.newRowPosition === 'Top') {
            args.index = (this.gridInstance.pageSettings.currentPage * this.gridInstance.pageSettings.pageSize) - this.gridInstance.pageSettings.pageSize;
        } else if (this.gridInstance.editSettings.newRowPosition === 'Bottom') {
            args.index = (this.gridInstance.pageSettings.currentPage * this.gridInstance.pageSettings.pageSize) - 1;
        }
    }
  }

	private ddChange(): void {
		this.gridInstance.editSettings.newRowPosition = this.dropDownInstance.value as NewRowPosition;
    this.gridInstance.refresh();
	}
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-md-9'>
            <GridComponent dataSource={orderDataSource} ref={grid => this.gridInstance = grid} allowSorting={true} toolbar={this.toolbarOptions} allowPaging={true} editSettings={this.editSettings} pageSettings={this.pageSettings}
            actionBegin={this.actionBegin.bind(this)}>
              <ColumnsDirective>
                <ColumnDirective field='OrderID' headerText='Order ID' width='140' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
                <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.customeridRule}></ColumnDirective>
                <ColumnDirective field='Freight' headerText='Freight' width='140' format='C2' textAlign='Right' validationRules={this.freightRule} editType='numericedit' ></ColumnDirective>
                <ColumnDirective field='OrderDate' headerText='Order Date' editType='datetimepickeredit' format= {this.format} width='160' ></ColumnDirective>
                <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={this.editparams} ></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Page, Toolbar, Edit, Sort]} />
            </GridComponent>
          </div>

            <div className='col-md-3 property-section'>
              <PropertyPane title='Properties'>
                <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                  <tbody>
                    <tr>
                      <td>
                        <div>Add New Row Position</div>
                      </td>
                      <td>
                        <div>
                          <DropDownListComponent id="newRowPosition" width="120px" index={0} change={this.ddChange.bind(this)} ref={d => this.dropDownInstance = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }} />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </PropertyPane>
            </div>
          <div id="action-description">
          <p>In this demo, you can edit the currently selected record by changing the state of the corresponding record to edit. You can carry out the following CRUD operations:</p>
         <ul>
                <li><code>Add</code> -  To add a new record, click the add toolbar button. </li>
                <li><code>Edit</code> - To edit record, double click a cell. </li>
                <li><code>Delete</code> - To delete a record, click the toolbar delete button after selecting a row. </li>
                <li><code>Update</code> and <code>Cancel</code> - Save or discard changes by clicking the toolbar update and cancel button respectively.</li>
            </ul>
            <p>By default, a new row will be added at the top of the grid. You can change it by setting <code>editSettings.newRowPosition</code> as <code>Bottom</code></p>
           </div>
        <div id="description">
          <p> Grid supports CRUD operations. This CRUD operations can be configured using
            <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/editSettings/">
            editSettings</a></code>. It also has the following modes to manipulate the datasource.
          </p>
          <ul>
              <li><code>Normal</code></li>
              <li><code>Dialog</code></li>
              <li><code>Batch</code></li>
          </ul>
          <p>
              In the normal edit mode, when you start editing the currently selected record is changed to edit state. You can edit any row by double clicking it or clicking the toolbar’s
              <code>Edit</code> button. You can change the row values and save edited data to the data source.
          </p>
          <p>
              In order to add a new record easily, the grid content always displays a blank "add new row".
              You can enable this feature by setting the <code>showAddNewRow</code> property of <code>editSettings</code> to true.
          </p>
          <p style={{ fontWeight: 500 }}>Injecting Module</p>
          <p>
            Grid features are separated into feature-wise modules. To use the editing feature, inject
            <code><a target="_blank" className="code"
            href="https://ej2.syncfusion.com/react/documentation/api/grid/edit/">
            Edit
            </a></code> module into the <code>services</code>.
          </p>
          <p>
            More information on the inline editing can be found in this 
            <a target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/grid/editing/in-line-editing">
              documentation section</a>.
          </p>
        </div>
      </div>
      </div>
    )
  }
}