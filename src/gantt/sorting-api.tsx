import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, DayMarkers, Sort, SortDirection, ColumnsDirective, ColumnDirective, LabelSettingsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { editingData } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

export class SortingAPI extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  private dropdownColumns: DropDownListComponent;
  private dropdownDirection: DropDownListComponent;
  public dropdownColumnsData: { [key: string]: Object }[] = [
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
  public labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName'
  };
  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 2
  };
  public projectStartDate: Date = new Date('03/26/2025');
  public projectEndDate: Date = new Date('09/01/2025');

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className='col-lg-9'>
            <GanttComponent id='SortingAPI' ref={gantt => this.ganttInstance = gantt} dataSource={editingData} highlightWeekends={true}
              allowSorting={true} treeColumnIndex={1} allowSelection={true} splitterSettings={this.splitterSettings}
              taskFields={this.taskFields} labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
              projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
                <ColumnDirective field='TaskID' visible={false} headerText='ID' width='80'></ColumnDirective>
                <ColumnDirective field='TaskName' headerText='Task Name' width='250'></ColumnDirective>
                <ColumnDirective field='StartDate' headerText='Start Date'></ColumnDirective>
                <ColumnDirective field='EndDate' headerText='End Date'></ColumnDirective>
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
                          value='TaskName'></DropDownListComponent>
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
                        <ButtonComponent onClick={this.sortColumn.bind(this)} style={{ marginRight: '5px', width: '80px' }}> Sort </ButtonComponent>
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
          <p>This sample demonstrates sorting tasks programmatically in the Gantt Chart. Select a column and sort direction from the property panel, then click the Sort button to apply sorting or Clear to remove it.</p>
        </div>

        <div id="description">
          <p>The Gantt Chart supports programmatic sorting through the <code>sortColumn</code> and <code>clearSorting</code> methods. Sorting can be enabled by setting the <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowsorting">allowSorting</a></code> to <code>true</code></p>
          <p>In this example, choose a column and sort direction from the property panel, then click the <strong>Sort</strong> button to apply sorting. Click the <strong>Clear</strong> button to remove the applied sorting. Users can also sort columns interactively by clicking the column headers. Multi-column sorting is supported by holding the <strong>CTRL</strong> key while selecting additional column headers.</p>
          <p>Gantt component features are segregated into individual feature-wise modules. To use a selection, markers and sorting features, we need to inject the <code>Selection</code>, <code>DayMarkers</code> and <code>Sort</code> into the <code>Inject Services</code> section.</p>
          <br />
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/sorting">sorting</a> documentation section.</p>
          <br/>
          <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    )
  }
}
