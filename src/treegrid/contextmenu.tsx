import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit,
  Toolbar, ContextMenu, Sort, Resize, ExcelExport, PdfExport } from '@syncfusion/ej2-react-treegrid';
import { ContextMenuItem } from '@syncfusion/ej2-react-grids';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

export class TreeContextMenu extends SampleBase<{}, {}> {
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Row' };
  public contextMenuItems: any= ['AutoFit', 'AutoFitAll',
        'SortAscending', 'SortDescending', 'Edit', 'Delete', 'Save',
        'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
        'LastPage', 'NextPage'];
  public validationRule: Object = { required: true};
  public validationRule1: Object = { date: true};
  public validationRule2: Object = { required: true, number: true};
  public editparams2: any = { params: { format: 'n' } };
  public editparams: any = { params: { popupHeight: '300px' } };
  public pageSettings: Object = { pageSize: 11};
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping= 'subtasks' height='350' allowPaging={true}
            editSettings={this.editSettings} pageSettings={this.pageSettings} contextMenuItems={this.contextMenuItems} allowSorting={true}
            allowExcelExport={true} allowPdfExport={true}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='80' textAlign='Right' validationRules={this.validationRule}
                isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='190' validationRules={this.validationRule}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='130' textAlign='Right'
                editType='datepickeredit' type='date' format='yMd' validationRules={this.validationRule1} />
              <ColumnDirective field='endDate' headerText='End Date' width='130' textAlign='Right'
                editType='datepickeredit' type='date' format='yMd' validationRules={this.validationRule1} />
              <ColumnDirective field='duration' headerText='Duration' width='90' editType='numericedit' textAlign='Right'
                validationRules={this.validationRule2} edit={this.editparams2} />
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' editType='dropdownedit' 
                edit={this.editparams} />
              <ColumnDirective field='priority' headerText='Priority' width='90' />
            </ColumnsDirective>
            <Inject services={[Page, Edit, Toolbar, ContextMenu, Sort, Resize, ExcelExport, PdfExport]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
    <p>This sample demonstrates the usage of context menu in Tree Grid component. Right click anywhere on the Grid to view context
        menu.
    </p>
</div>

<div id="description">
    <p>
        Tree Grid has an option to show the context menu when right click on it. To configure the items in context menu, you should define 
        either default or custom item in <code>contextMenuItems</code>.Each item will be shown based on its target. The default items are 
    </p>
    <ul>
            <li><code>Edit</code> - Edit the current record.</li>
            <li><code>Delete</code> - Delete the current record.</li>
            <li><code>Save</code> - Save the edited record.</li>
            <li><code>Cancel</code> - Cancel the edited state.</li>
            <li><code>PdfExport</code> - Export the grid as Pdf format.</li>
            <li><code>ExcelExport</code> - Export the grid as Excel format.</li>
            <li><code>CsvExport</code> - Export the grid as CSV format.</li>
            <li><code>SortAscending</code> - Sort the current column in ascending order.</li>
            <li><code>SortDescending</code> - Sort the current column in descending order.</li>
            <li><code>FirstPage</code> - Go to the first page.</li>
            <li><code>PrevPage</code> - Go to the previous page.</li>
            <li><code>LastPage</code> - Go to the last page.</li>
            <li><code>NextPage</code> - Go to the next page.</li>
            <li><code>Add Row</code>
                <ul>
                    <li><code>Above</code> - Add a new row above the selected row</li>
                    <li><code>Below</code> - Add a new row below the selected row</li>
                </ul>
            </li>
    </ul>

    <p>
        In this demo, Context Menu feature has enabled by defining the <code>contextMenuItems</code> property with all default items.
    </p>

    <p>Injecting Module:</p>
    <p>
        Tree Grid features are segregated into individual feature-wise modules. 
        To use context menu feature, we need to inject <code>ContextMenu</code> module into the <code>services</code>.
    </p>
</div>
      </div>
    )
  }
}