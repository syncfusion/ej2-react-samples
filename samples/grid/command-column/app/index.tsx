import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, CommandColumn } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

export class CommandColumnEdit extends SampleBase<{}, {}> {
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true };
  public editparams: any = { params: { popupHeight: '300px' } };
  public validationRule: Object = { required: true};
  public commands: any = [{ type: 'edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
  { type: 'delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
  { type: 'save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
  { type: 'cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={data}  allowPaging={true} editSettings={this.editSettings}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right' validationRules={this.validationRule}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRule}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' editType='numericedit' ></ColumnDirective>
              <ColumnDirective field='ShipName' headerText='Ship Name' width='170' ></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={this.editparams} ></ColumnDirective>
              <ColumnDirective headerText='Manage Records' width='160' commands={this.commands}></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, CommandColumn, Edit]} />
          </GridComponent>
      </div>
      </div>
    )
  }
}

ReactDOM.render(<CommandColumnEdit />, document.getElementById('sample'));