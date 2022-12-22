import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, Reorder, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ActionEventArgs } from '@syncfusion/ej2-react-grids';
import { Column } from '@syncfusion/ej2-grids';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

function ReorderColumn() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  let ganttObj: GanttComponent;
  let columnsDropdownObj: DropDownListComponent;
  let columnIndexDropdownObj: DropDownListComponent;

  let columnNames: { [key: string]: Object }[] = [
    { id: 'TaskID', name: 'ID' },
    { id: 'TaskName', name: 'Name' },
    { id: 'StartDate', name: 'Start Date' },
    { id: 'EndDate', name: 'End Date' },
    { id: 'Duration', name: 'Duration' },
    { id: 'Progress', name: 'Progress' },
    { id: 'Predecessor', name: 'Dependency' }
  ];

  let columnsIndex: { [key: string]: Object }[] = [
    { id: '0', name: '1' },
    { id: '1', name: '2' },
    { id: '2', name: '3' },
    { id: '3', name: '4' },
    { id: '4', name: '5' },
    { id: '5', name: '6' },
    { id: '6', name: '7' }
  ];
  function columnNameChange(args: ChangeEventArgs): void {
    let columnName: string = args.value.toString();
    let index: number = ganttObj.treeGrid.getColumnIndexByField(columnName);
    columnIndexDropdownObj.value = index.toString();
  }

  function columnIndexChange(args: ChangeEventArgs): void {
    let columnName: string = columnsDropdownObj.value.toString();
    let toColumnIndex: number = args.value as number;
    let column: Column = ganttObj.treeGrid.columns[toColumnIndex] as Column;
    ganttObj.reorderColumns(columnName, column.field);
  }
  function actionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'reorder') {
      let columnName: string = columnsDropdownObj.value as string;
      let index: number = ganttObj.treeGrid.getColumnIndexByField(columnName);
      columnIndexDropdownObj.value = index.toString();
    }
  }
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const splitterSettings: any = {
    columnIndex: 4
  };
  const projectStartDate: Date = new Date('03/24/2019');
  const projectEndDate: Date = new Date('07/06/2019');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-md-9'>
          <GanttComponent id='ReorderColumn' treeColumnIndex={1} allowReordering={true}
            ref={gantt => ganttObj = gantt} splitterSettings={splitterSettings} actionComplete={actionComplete.bind(this)} dataSource={projectNewData} highlightWeekends={true}
            taskFields={taskFields} labelSettings={labelSettings} height='410px'
            projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='ID' width='100' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor' headerText='Dependency'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, Reorder]} />
          </GanttComponent>
        </div>
        <div className='col-md-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                  <div style={{ paddingTop: '10px' }}> Column </div>
                </td>
                <td style={{ width: '50%', paddingRight: '10px' }}>
                  <div>
                    <DropDownListComponent width="120px" id="columns" change={columnNameChange.bind(this)}
                      dataSource={columnNames} fields={{ text: 'name', value: 'id' }} value="TaskID"
                      ref={dropdown => columnsDropdownObj = dropdown} />
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                  <div> Column Index </div>
                </td>
                <td style={{ width: '50%', paddingRight: '10px' }}>
                  <div>
                    <DropDownListComponent width="120px" id="columnindex" change={columnIndexChange.bind(this)}
                      dataSource={columnsIndex} fields={{ text: 'name', value: 'id' }} value="0"
                      ref={dropdown => columnIndexDropdownObj = dropdown} />
                  </div>
                </td>
              </tr>
            </table>
          </PropertyPane>
        </div>

      </div>
      <div id="action-description">
        <p>This sample demonstrates the reordering feature of the Gantt columns. Select column name and index from properties panel to reorder the columns.
          You can also reorder columns by simply dragging and dropping them to the desired position.
        </p>
      </div>

      <div id="description">
        <p>Reordering can be enabled by setting the <code>allowReordering</code> property to true.
          Reordering can be done by dragging and dropping the column header from one index to another index within the TreeGrid part.</p>
        <p>The location in which the column to be placed will be indicated by two arrows symbols.</p>
        <p>In this demo, you can either reorder columns by dragging and dropping or by selecting column name and column index from dropdown to reorder the columns.
        </p>
        <b>Injecting Module:</b>
        <p>Gantt features are segregated into individual feature-wise modules. To use reordering feature, we need to
          inject <code>Reorder</code> module into the <code>services</code>.</p>
        <p>
          More information about Column Reorder can be found in this documentation section.
        </p>
      </div>
    </div>
  )
}
export default ReorderColumn;
