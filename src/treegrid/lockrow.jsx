import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { sampleData, lockRowDropDownData } from './data';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { addClass, removeClass } from '@syncfusion/ej2-base';
const SAMPLE_CSS = `
  .disableRow .e-rowcell{
    color: rgba(0, 0, 0, .38);
  }`;
export class LockRow extends SampleBase {
    constructor() {
        super(...arguments);
        this.toolbarOptions = ['Edit', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, mode: 'Row', newRowPosition: 'Child' };
        this.editparams = { params: { popupHeight: '300px' } };
        this.validationRule = { required: true, number: true };
        this.validationRule1 = { required: true };
        this.validationRule2 = { date: true };
        this.validationRule3 = { number: true, min: 0 };
        this.editparams2 = { params: { format: 'n' } };
        this.pageSettings = { pageSize: 2, pageSizeMode: 'Root' };
        this.rowValues = [2, 6];
    }
    rowDataBound(args) {
        let key = 'taskID';
        if (this.multiselectObj.value.indexOf(args.data[key]) !== -1) {
            addClass([args.row], 'disableRow');
        }
        else {
            removeClass([args.row], 'disableRow');
        }
    }
    beginEdit(args) {
        let key = 'taskID';
        if (this.multiselectObj.value.indexOf(args.rowData[key]) !== -1) {
            args.cancel = true;
        }
    }
    select() {
        this.treegridObj.refresh();
    }
    removed() {
        this.treegridObj.refresh();
    }
    render() {
        return (<div className='control-pane'>
        <style>
          {SAMPLE_CSS}
        </style>

        <div className='control-section'>
          <div className='col-md-8'> 
           <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' allowPaging='true' editSettings={this.editSettings} pageSettings={this.pageSettings} toolbar={this.toolbarOptions} enableHover='false' rowDataBound={this.rowDataBound.bind(this)} ref={treegrid => this.treegridObj = treegrid} beginEdit={this.beginEdit.bind(this)}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='100' textAlign='Right' validationRules={this.validationRule} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='220' validationRules={this.validationRule1}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='130' textAlign='Right' editType='datepickeredit' format='yMd' validationRules={this.validationRule2}/>
              <ColumnDirective field='duration' headerText='Duration' width='100' editType='numericedit' textAlign='Right' validationRules={this.validationRule3} edit={this.editparams2}/>
            </ColumnsDirective>
            <Inject services={[Page, Edit, Toolbar]}/>
          </TreeGridComponent>
        </div>
        <div className='col-md-2 property-section'>
          <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                  <tr style={{ height: '50px' }}>
                  <td style={{ width: '10%' }}>
                      <div> Disable Rows </div>
                    </td>
                    <td style={{ width: '60%' }}>
                      <div>
                         <MultiSelectComponent width="150px" id="lockrows" mode="CheckBox" value={this.rowValues} dataSource={lockRowDropDownData} showDropDownIcon={true} popupHeight='350px' select={this.select.bind(this)} removed={this.removed.bind(this)} ref={multiselect => this.multiselectObj = multiselect}>
                          <Inject services={[CheckBoxSelection]}></Inject>
                          </MultiSelectComponent>
                      </div>
                    </td>
                  </tr>
              </table>
          </PropertyPane>
         </div>
        </div>
        <div id="action-description">
          <p>
            This samples demonstrates the way of preventing editing for certain row and disable the locked rows
              to differentiate edit and non-editable rows in TreeGrid.
          </p>
        </div>
        <div id="description">
          <p>
            The TreeGrid supports CRUD operations. This CRUD operations can be configured in TreeGrid using <code>editSettings</code>.
            Also, it has different modes to manipulate the datasource.
          </p>
          <p> The available modes are,</p>
          <ul>
            <li><code>Row </code></li>
            <li><code>Cell</code></li>
            <li><code>Dialog</code></li>
          </ul>
          <p>
            In this sample, we have provided an option in property panel to prevent editing for certain rows. Using <code>beginEdit</code>
              event of treegrid, we prevent the editing for selected Task ID row in the dropdown and disable the corresponding row using
              <code>rowDataBound</code> event of TreeGrid.
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
