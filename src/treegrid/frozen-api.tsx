import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Freeze, Inject, Sort, Column } from '@syncfusion/ej2-react-treegrid';
import { frozenSampleData } from './data';
import { SampleBase } from '../common/sample-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { freezeDirection } from '@syncfusion/ej2-react-grids';


export class FrozenAPI extends SampleBase<{}, {}> {
  public treegrid: TreeGridComponent;
  private freezeDropDown: DropDownListComponent;
  private columnDropDown: DropDownListComponent;
  private alertDialogInstance: DialogComponent;
  public refresh: boolean = true;
  public columnNames: { [key: string]: Object }[] = [
    { id: 'taskID', name: 'Task ID' },
    { id: 'taskName', name: 'TaskName' },
    { id: 'startDate', name: 'Start Date' },
    { id: 'endDate', name: 'End Date' },
    { id: 'duration', name: 'Duration' },
    { id: 'progress', name: 'Progress' },
    { id: 'priority', name: 'Priority' },
    { id: 'designation', name: 'Designation' },
    { id: 'employeeID', name: 'EmployeeID' },
    { id: 'approved', name: 'Approved'}
    ];
    public directions: { [key: string]: Object }[] = [
      { id: 'Left', name: 'Left' },
      { id: 'Right', name: 'Right' },
      { id: 'Center', name: 'Center' }
    ];
    private fields: Object = { text: 'name', value: 'id' };
    public directionChange(e: ChangeEventArgs): void {
      if (this.refresh) {
        let columnName: string = this.columnDropDown.value as string;
        let mvblColumns: any = this.treegrid.getMovableColumns();
        if (mvblColumns.length === 1 && columnName === mvblColumns[0].field && e.value !== mvblColumns[0].freeze) {
          this.alertDialogInstance.show();
          this.refresh = false; this.freezeDropDown.value = "Center"; this.freezeDropDown.refresh();
        } else {
          let columns: Column[] = this.treegrid.getColumns();
          let column = columns.find((col) => col.field === columnName);
          if (column) {
            column.freeze = e.value === 'Center' ? undefined : e.value as freezeDirection;
          }
          this.treegrid.columns = columns;
        }
      }
      this.refresh = true;
    };
    public columnChange(e:ChangeEventArgs): void {
      let columnName: string = e.value as string;
      let column: Column = this.treegrid.getColumnByField(columnName);
      let value: string = column.freeze === undefined ? 'Center' : column.freeze;
      this.refresh = this.freezeDropDown.value === value;
      this.freezeDropDown.value = value;
    };
    public confirmButton = [{
      click: () => {
        this.alertDialogInstance.hide();
      },
      buttonModel: { content: 'OK', isPrimary: true }
    }];
  
    render() {
      return (
        <div className='control-pane'>
          <div className='control-section'>
            <div style={{ paddingBottom: '5px' }}>
              <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                  <span>
                    Column
                  </span>
                </div>
                <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                  <DropDownListComponent id="column" dataSource={this.columnNames} change={this.columnChange.bind(this)} value="taskID" fields={this.fields} ref={(colDropDown) => { this.columnDropDown = colDropDown }} />
                </div>
              </div>
              <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                  <span>
                    Freeze Direction
                  </span>
                </div>
                <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                  <DropDownListComponent id="freezedirection" dataSource={this.directions} value="Left" change={this.directionChange.bind(this)} fields={this.fields} ref={(frzDropDown) => { this.freezeDropDown = frzDropDown }} />
                </div>
              </div>
            </div>

            <TreeGridComponent
              ref={g => (this.treegrid = g)} dataSource={frozenSampleData} childMapping="subtasks" treeColumnIndex={1} allowSorting={true} allowSelection={false} height="410">
              <ColumnsDirective>
                <ColumnDirective field="taskID" headerText="Task ID" width="100" textAlign="Right" freeze="Left"/>
                <ColumnDirective field="taskName" headerText="Task Name" width="250"/>
                <ColumnDirective field="startDate" headerText="Start Date" width="130" format="yMd" textAlign="Right"/>
                <ColumnDirective field="endDate" headerText="End Date" width="150" format="yMd" textAlign="Right"/>
                <ColumnDirective field="duration" headerText="Duration" width="130" textAlign="Right"/>
                <ColumnDirective field="progress" headerText="Progress" width="130" textAlign="Right"/>
                <ColumnDirective field="priority" headerText="Priority" width="160" textAlign="Left"/>
                <ColumnDirective field="designation" headerText="Designation" width="190" textAlign="Left" />
                <ColumnDirective field="employeeID" headerText="EmployeeID" width="120" textAlign="Right"/>
                <ColumnDirective field="approved" headerText="Approved" width="140" displayAsCheckBox={true} textAlign="Left" freeze="Right"/>
              </ColumnsDirective>
              <Inject services={[Freeze, Sort]} />
            </TreeGridComponent>
            <DialogComponent id="alertDialog" header='Frozen' visible={false} animationSettings={{ effect: 'None' }} width='300px' content='Atleast one Column should be in movable' ref={(alertdialog) => { this.alertDialogInstance = alertdialog }}
              target='.control-section' buttons={this.confirmButton} showCloseIcon={false} >
              </DialogComponent>
          </div>
          <div id="action-description">
            <p>This sample demonstrates the frozen rows and columns feature of the Tree Grid. Scroll the movable content
              horizontally to view the frozen columns with the content.
              </p>
            </div>
          <div id="description">
            <p>The freezing feature enables the user to freeze certain rows/columns at both sides to scroll remaining movable
              content. This can be achieved by setting <code><a target="_blank" className="code"
                href="https://ej2.syncfusion.com/react/documentation/treegrid/scrolling/#frozen-rows-and-columns">freeze</a></code> property in column settings.
            </p>
            <p> In this demo sample, <b>Task ID</b> column is freezed at left side and <b>Approved</b> column is freezed at
              right side using <code>Column-&gt;freeze</code>property.</p>
            <p style={{ fontWeight: 500 }}>Injecting Module:</p>
            <p> Tree Grid features are segregated into individual feature-wise modules. To use frozen rows and columns feature, we
              need to inject <code><a target="_blank" className="code"
                href="https://ej2.syncfusion.com/react/documentation/treegrid/scrolling/#frozen-rows-and-columns">Freeze
              </a></code> module into the <code>services</code></p>
          </div>

        </div>
      )
    }

}
