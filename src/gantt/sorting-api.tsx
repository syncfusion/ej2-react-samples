import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, Sort, SortDirection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { editingData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent, DropDownList } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

export class SortingAPI extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  private dropdownColumns: DropDownListComponent;
  private dropdownDirection: DropDownListComponent;
  public dropdownColumnsData: { [key: string]: Object }[] = [
    { id: 'TaskID', type: 'TaskID' },
    { id: 'TaskName', type: 'TaskName' },
    { id: 'StartDate', type: 'StartDate' },
    { id: 'EndDate', type: 'EndDate' },
    { id: 'Duration', type: 'Duration' },
    { id: 'Progress', type: 'Progress' }
  ];
  public dropdownDirectionData: { [key: string]: Object }[] = [
    { id: 'Ascending', type: 'Ascending' },
    { id: 'Descending', type: 'Descending' },
  ];
  private sortColumn(): void {
    let columnName: string = this.dropdownColumns.value as string;
    let sortType: string = this.dropdownDirection.value as string;
    this.ganttInstance.sortModule.sortColumn(columnName, sortType as SortDirection, false);
  }

  private clearSort(): void {
    this.ganttInstance.clearSorting();
  }
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public splitterSettings: any = {
    columnIndex: 2
  };
  public projectStartDate: Date = new Date('03/25/2024');
  public projectEndDate: Date = new Date('07/28/2024');

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9'>
            <GanttComponent id='SortingAPI' ref={gantt => this.ganttInstance = gantt} dataSource={editingData} highlightWeekends={true}
              allowSorting={true} treeColumnIndex={1} allowSelection={true} splitterSettings={this.splitterSettings}
              taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
              projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
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
                      <DropDownListComponent ref={DropDownList => this.dropdownColumns = DropDownList} id='columns' width="150px" tabIndex={1} dataSource={this.dropdownColumnsData} fields={{ text: 'type', value: 'id' }}
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
                      <DropDownListComponent ref={DropDownList => this.dropdownDirection = DropDownList} id='direction' width="150px" tabIndex={1} dataSource={this.dropdownDirectionData} fields={{ text: 'type', value: 'id' }}
                        value='Ascending'></DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '100%' }}>
                    <div>
                      <ButtonComponent onClick={this.sortColumn.bind(this)} style={{ marginRight: '5px',  width: '80px' }}> Sort </ButtonComponent>
                      <ButtonComponent onClick={this.clearSort.bind(this)} style={{ width: '80px' }}> Clear </ButtonComponent>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
          <p> The sorting feature enables you to order data in a particular direction. It can be enabled by setting <code>allowSorting</code> to <code>true</code>.</p>
        </div>

        <div id="description">
          <p>The sorting feature enables you to order data in a particular direction. It can be enabled by setting the <code>allowSorting</code> to true.</p>
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
}
