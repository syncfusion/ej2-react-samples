import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, Resize, ColumnsDirective, ColumnDirective, LabelSettingsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';

export class Resizing extends SampleBase<{}, {}> {
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
    rightLabel: 'TaskName'
  };
  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 6
  };
  public projectStartDate: Date = new Date('03/30/2025');
  public projectEndDate: Date = new Date('07/20/2025');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Resizing' treeColumnIndex={1}
            allowResizing={true} dataSource={projectNewData} highlightWeekends={true} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='ID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='250' minWidth='120' maxWidth='300'></ColumnDirective>
              <ColumnDirective field='StartDate' headerText='Start Date' minWidth='8' width='135'></ColumnDirective>
              <ColumnDirective field='EndDate' headerText='End Date' minWidth='8' width='135'></ColumnDirective>
              <ColumnDirective field='Duration' headerText='Duration' allowResizing={false} width='120'></ColumnDirective>
              <ColumnDirective field='Progress' headerText='Progress' minWidth='8' textAlign='Right' width='120'></ColumnDirective>
              <ColumnDirective field='Predecessor' headerText='Dependency' minWidth='8' textAlign='Left' width='135'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, Resize]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates column resizing in the Gantt Chart. Resize a column by dragging the right edge of its header to adjust the column width.</p>
        </div>

        <div id="description">
          <p>Columns can be resized interactively by dragging the right edge of a column header. Individual columns can also define <code>minWidth</code> and <code>maxWidth</code> values to restrict resizing within a specified range. To enable resizing, set the <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#allowresizing">allowResizing</a></code> property to <code>true</code>.</p>
          <p>In this sample, the <code>Task Name</code> column can be resized between 120 and 300 pixels, while resizing is disabled for the <code>Duration</code> column using the column-level <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#allowresizing">allowResizing</a></code> property.</p>
          <p>Gantt component features are segregated into individual feature-wise modules. To use Resize and selection features, we need to inject <code>Resize</code> and <code>Selection</code> into the <code>Inject Services</code> section.</p>
          <br />
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/columns/column-resizing">column resizing</a> documentation section.</p>
          <br/>
          <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    )
  }
}
