import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

export class Dialog extends SampleBase<{}, {}> {
  public toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode:'Dialog' };
  public editparams: any = { params: { popupHeight: '300px' } };
  public validationRule: Object = { required: true};
  public validationRule1: Object = { date: true};
  public validationRule2: Object = { required: true, number: true};
  public editparams2: any = { params: { format: 'n' } };
  public pageSettings: Object = { pageCount: 8};
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping= 'subtasks' allowPaging='true'
            editSettings={this.editSettings} pageSettings={this.pageSettings} toolbar={this.toolbarOptions}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right' validationRules={this.validationRule}
                isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='150' validationRules={this.validationRule}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='110' textAlign='Right'
                editType='datepickeredit' format='yMd' validationRules={this.validationRule1} />
              <ColumnDirective field='endDate' headerText='End Date' width='130' textAlign='Right'
                editType='datepickeredit' format='yMd' />
              <ColumnDirective field='duration' headerText='Duration' width='90' editType='numericedit' textAlign='Right'
                validationRules={this.validationRule2} edit={this.editparams2} />
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' editType='dropdownedit' 
                edit={this.editparams} />
            </ColumnsDirective>
            <Inject services={[Page, Edit, Toolbar]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p> This sample demonstrates Dialog Editing </p>
        </div>
        <div id='description'>
          <p>In this demo, Dialog mode is enabled for editing by defining <code>editSettings.mode</code> as dialog. You can start editing
              by double clicking a row or clicking on toolbar's Edit button, then the currently selected row will be shown on a dialog and
              you can change the row values and save edited data to the datasource.</p>
          <p>Injecting Module:</p>
          <p>TreeGrid features are segregated into individual feature-wise modules. To use editing feature, we need to inject
             <code>Edit</code>module into the <code>services</code>.</p>
          <p>
            More information on the selection configuration can be found in this documentation section.
          </p>
        </div>
      </div>
    )
  }
}