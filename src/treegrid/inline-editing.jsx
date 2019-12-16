import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
export class Editing extends SampleBase {
    constructor() {
        super(...arguments);
        this.toolbarOptions = ['Add', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Cell', newRowPosition: 'Below' };
        this.validationRule = { required: true };
        this.validationRule1 = { date: true };
        this.validationRule2 = { required: true, number: true };
        this.editparams2 = { params: { format: 'n' } };
        this.pageSettings = { pageCount: 5 };
        this.editing = [
            { id: 'CellEditing', name: 'Cell Editing' }, { id: 'RowEditing', name: 'Row Editing' }
        ];
    }
    change(args) {
        if (args.value === 'CellEditing') {
            this.treegridObj.editSettings.mode = 'Cell';
            this.treegridObj.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
        }
        else {
            this.treegridObj.editSettings.mode = 'Row';
            this.treegridObj.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        }
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
         <div className='col-md-9'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' allowPaging='true' editSettings={this.editSettings} pageSettings={this.pageSettings} toolbar={this.toolbarOptions} ref={treegrid => this.treegridObj = treegrid}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='90' textAlign='Right' validationRules={this.validationRule} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='220' validationRules={this.validationRule}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='160' textAlign='Right' editType='datepickeredit' format='yMd' validationRules={this.validationRule1}/>
              <ColumnDirective field='duration' headerText='Duration' width='100' editType='numericedit' textAlign='Right' validationRules={this.validationRule2} edit={this.editparams2}/>
            </ColumnsDirective>
            <Inject services={[Page, Edit, Toolbar]}/>
          </TreeGridComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div> Edit Mode </div>
                  </td>
                  <td style={{ width: '50%', paddingRight: '10px' }}>
                    <div id='columnddl'>
                        <DropDownListComponent width="120px" id="selmode" change={this.change.bind(this)} dataSource={this.editing} fields={{ text: 'name', value: 'id' }} value="CellEditing"/>
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
      </div>
        <div id="action-description">
          <p>This sample demonstrates CRUD operations in TreeGrid. You can perform CRUD operations as follows,</p>
          <ul>
            <li><code>Add</code> -  To add new record, click Add toolbar button </li>
            <li><code>Edit</code> - To edit record, double click a row or click toolbar Edit button after selected a row </li>
            <li><code>Delete</code> - To delete record, click toolbar Delete button after selected a row </li>
            <li><code>Update</code>,<code>Cancel</code> - You can save or discard changes by click toolbar Update 
              and cancel button respectively</li>
          </ul>
        </div>
        <div id='description'>
          <p>The TreeGrid supports CRUD operations. This CRUD operations can be configured in TreeGrid using editSettings. Also, it has
            different modes to manipulate the datasource.</p>
          <ul>
            <li><code>Row</code></li>
            <li><code>Cell</code></li>
            <li><code>Dialog</code></li>
          </ul>
          <p>In this demo, Row mode is enabled for editing by default. You can start editing any row by double clicking on it or
            clicking on toolbar’s Edit button, then the currently selected row will be changed to edited state. You can change the
            row values and save edited data to the datasource.</p>
          <p>
            We have also provided an option in property panel to select the edit mode as Cell or Row to change <code>mode</code> of editing.
          </p>
          <p>Injecting Module:</p>
          <p>TreeGrid features are segregated into individual feature-wise modules. To use editing feature, we need to inject
             <code>Edit</code> module into the <code>services</code>.</p>
          <p>
            More information on the selection configuration can be found in this documentation section.
          </p>
        </div>
      </div>);
    }
}
