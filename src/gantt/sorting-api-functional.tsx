import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, Sort, SortDirection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { editingData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent, DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

const SortingAPI = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance = useRef<GanttComponent>(null);
  let dropdownColumns = useRef<DropDownListComponent>(null);
  let dropdownDirection = useRef<DropDownListComponent>(null);
  const dropdownColumnsData: { [key: string]: Object }[] = [
    { id: 'TaskID', type: 'TaskID' },
    { id: 'TaskName', type: 'TaskName' },
    { id: 'StartDate', type: 'StartDate' },
    { id: 'EndDate', type: 'EndDate' },
    { id: 'Duration', type: 'Duration' },
    { id: 'Progress', type: 'Progress' }
  ];
  const dropdownDirectionData: { [key: string]: Object }[] = [
    { id: 'Ascending', type: 'Ascending' },
    { id: 'Descending', type: 'Descending' },
  ];
  const sortColumn = (): void => {
    let columnName: string = dropdownColumns.current.value as string;
    let sortType: string = dropdownDirection.current.value as string;
    ganttInstance.current.sortModule.sortColumn(columnName, sortType as SortDirection, false);
  }

  const clearSort = (): void => {
    ganttInstance.current.clearSorting();
  }
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
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const splitterSettings: any = {
    columnIndex: 2
  };
  const projectStartDate: Date = new Date('03/25/2024');
  const projectEndDate: Date = new Date('07/28/2024');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-9'>
          <GanttComponent id='SortingAPI' ref={ganttInstance} dataSource={editingData} highlightWeekends={true}
            allowSorting={true} treeColumnIndex={1} allowSelection={true} splitterSettings={splitterSettings}
            taskFields={taskFields} labelSettings={labelSettings} height='410px'
            projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='ID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate' headerText='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate' headerText='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration' headerText='Duration'></ColumnDirective>
              <ColumnDirective field='Progress' headerText='Progress'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers, Sort]} />
          </GanttComponent>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id="property" className="property-panel-table" title="Properties" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '100%' }}>
                  <div style={{ fontSize: '15px' }}>
                    Column
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '100%', paddingRight: '10px' }}>
                  <div>
                    <DropDownListComponent ref={dropdownColumns} id='columns' width="150px" tabIndex={1} dataSource={dropdownColumnsData} fields={{ text: 'type', value: 'id' }}
                      value='TaskID'></DropDownListComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '100%' }}>
                  <div style={{ fontSize: '15px' }}>
                    Direction
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '100%', paddingRight: '10px' }}>
                  <div>
                    <DropDownListComponent ref={dropdownDirection} id='direction' width="150px" tabIndex={1} dataSource={dropdownDirectionData} fields={{ text: 'type', value: 'id' }}
                      value='Ascending'></DropDownListComponent>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ width: '100%' }}>
                  <div>
                    <ButtonComponent onClick={sortColumn.bind(this)} style={{ marginRight: '5px', width: '80px' }}> Sort </ButtonComponent>
                    <ButtonComponent onClick={clearSort.bind(this)} style={{ width: '80px' }}> Clear </ButtonComponent>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </div>
      <div id="action-description">
        <p> The sorting feature enables you to order data in a particular direction. It can be enabled by setting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowselection">allowSelection</a> to <code>true</code>.</p>
      </div>

      <div id="description">
        <p>The sorting feature enables you to order data in a particular direction. It can be enabled by setting the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowselection">allowSelection</a> to true.</p>
        <p>To sort a Gantt column, click the column header. The icons (ascending) and (descending) specify the sort direction of a column.</p>
        <p>By default, the multi-sorting feature is enabled in Gantt. To sort multiple columns, hold the <strong>CTRL</strong> key, and then click the column header. To clear sort for a column, hold the <strong>SHIFT</strong> key, and then click the column header.</p>
        <p>In this demo, select the column and direction from the properties panel, and then click the Sort button. Use the Clear button to remove sort for the sorted column.</p>

        <p>Gantt component features are segregated into individual feature-wise modules. To use a selection, inject the
          <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method.To use sort, inject the
          <code>Sort</code> module using the <code>Gantt.Inject(Sort)</code> method.To use markers, inject the
          <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.</p>
      </div>
    </div>
  )
}
export default SortingAPI;
