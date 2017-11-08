import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Edit, Toolbar, Page, Inject } from '@syncfusion/ej2-react-grids';
import { data } from '../data';
import { SampleBase } from './sample-base';

export class BatchEdit extends SampleBase<{}, {}> {
  public toolbarOptions: any = ['add', 'delete', 'update', 'cancel'];
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'batch' };
  public editparams: any = { params: { popupHeight: '300px' } };
  public validationRule: Object = { required: true };
  public pageSettings: Object = { pageCount: 5};
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={data} pageSettings={this.pageSettings} toolbar={this.toolbarOptions} allowPaging={true} editSettings={this.editSettings}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='right' validationRules={this.validationRule} isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRule}></ColumnDirective>
              <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='right' editType='numericedit' ></ColumnDirective>
              <ColumnDirective field='ShipName' headerText='Ship Name' width='170' ></ColumnDirective>
              <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={this.editparams} ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit]} />
          </GridComponent>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<BatchEdit />, document.getElementById('sample'));