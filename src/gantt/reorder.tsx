import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, Reorder, ColumnsDirective, ColumnDirective, LabelSettingsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ActionEventArgs } from '@syncfusion/ej2-react-grids';
import { Column } from '@syncfusion/ej2-grids';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

export class ReorderColumn extends SampleBase<{}, {}> {
  public taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'
  };
  public ganttObj: GanttComponent;
  public columnsDropdownObj: DropDownListComponent;
  public columnIndexDropdownObj: DropDownListComponent;

  private columnNames: { [key: string]: Object }[] = [
    { id: 'TaskID', name: 'ID' },
    { id: 'TaskName', name: 'Name' },
    { id: 'StartDate', name: 'Start Date' },
    { id: 'EndDate', name: 'End Date' },
    { id: 'Duration', name: 'Duration' },
    { id: 'Progress', name: 'Progress' },
    { id: 'Predecessor', name: 'Dependency' }
  ];

  private columnsIndex: { [key: string]: Object }[] = [
    { id: '0', name: '1' },
    { id: '1', name: '2' },
    { id: '2', name: '3' },
    { id: '3', name: '4' },
    { id: '4', name: '5' },
    { id: '5', name: '6' },
    { id: '6', name: '7' }
  ];
  private columnNameChange(args: ChangeEventArgs): void {
    let columnName: string = args.value.toString();
    let index: number = this.ganttObj.treeGrid.getColumnIndexByField(columnName);
    this.columnIndexDropdownObj.value = index.toString();
  }

  private columnIndexChange(args: ChangeEventArgs): void {
    let columnName: string = this.columnsDropdownObj.value.toString();
    let toColumnIndex: number = args.value as number;
    let column: Column = this.ganttObj.treeGrid.columns[toColumnIndex] as Column;
    this.ganttObj.reorderColumns(columnName, column.field);
  }
  private actionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'reorder') {
      let columnName: string = this.columnsDropdownObj.value as string;
      let index: number = this.ganttObj.treeGrid.getColumnIndexByField(columnName);
      this.columnIndexDropdownObj.value = index.toString();
    }
  }
  public labelSettings: LabelSettingsModel = {
    rightLabel: 'TaskName'
  };
  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 3
  };
  public projectStartDate: Date = new Date('03/31/2025');
  public projectEndDate: Date = new Date('07/20/2025');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-md-9'>
            <GanttComponent id='ReorderColumn' treeColumnIndex={1} allowReordering={true}
              ref={gantt => this.ganttObj = gantt} splitterSettings={this.splitterSettings} actionComplete={this.actionComplete.bind(this)} dataSource={projectNewData} highlightWeekends={true}
              taskFields={this.taskFields} labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
              projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
                <ColumnDirective field='TaskID' headerText='ID' width='100' ></ColumnDirective>
                <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
                <ColumnDirective field='StartDate' headerText='Start Date'></ColumnDirective>
                <ColumnDirective field='EndDate' headerText='End Date'></ColumnDirective>
                <ColumnDirective field='Duration' headerText='Duration'></ColumnDirective>
                <ColumnDirective field='Progress' headerText='Progress'></ColumnDirective>
                <ColumnDirective field='Predecessor' headerText='Dependency'></ColumnDirective>
              </ColumnsDirective>
              <Inject services={[Selection, Reorder]} />
            </GanttComponent>
          </div>
          <div className='col-md-3 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tbody>
                  <tr style={{ height: '50px' }}>
                    <td style={{ width: '30%' }}>
                      <div style={{ paddingTop: '10px' }}> Column </div>
                    </td>
                    <td style={{ width: '50%', paddingRight: '10px' }}>
                      <div>
                        <DropDownListComponent width="120px" id="columns" change={this.columnNameChange.bind(this)}
                          dataSource={this.columnNames} fields={{ text: 'name', value: 'id' }} value="TaskID"
                          ref={dropdown => this.columnsDropdownObj = dropdown} />
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: '50px' }}>
                    <td style={{ width: '30%' }}>
                      <div> Column Index </div>
                    </td>
                    <td style={{ width: '50%', paddingRight: '10px' }}>
                      <div>
                        <DropDownListComponent width="120px" id="columnindex" change={this.columnIndexChange.bind(this)}
                          dataSource={this.columnsIndex} fields={{ text: 'name', value: 'id' }} value="0"
                          ref={dropdown => this.columnIndexDropdownObj = dropdown} />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates column reordering in the Gantt Chart. Reorder columns either by dragging column headers to a new position or by selecting a column and target index from the property panel.
          </p>
        </div>

        <div id="description">
          <p>This example demonstrates the column reordering feature in the Gantt Chart. Column reordering can be enabled by setting the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowreordering">allowReordering</a> property to <code>true</code>.
            Columns can be reordered by dragging a column header and dropping it at the desired position within the TreeGrid area. Visual indicators are displayed to show the target drop location during the reordering operation.</p>
          <p>In this sample, columns can also be reordered programmatically using the property panel by selecting a column and its destination index.</p>
          <p>Gantt component features are segregated into individual feature-wise modules. To use reordering and selection features, we need to inject <code>Reorder</code> and <code>Selection</code> into the <code>Inject Services</code> section.</p>
          <br />
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/columns/column-reordering">column reordering</a> documentation section.</p>
          <br/>
          <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    )
  }
}
