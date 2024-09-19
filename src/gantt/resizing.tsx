import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, Resize, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';

export class Resizing extends SampleBase<{}, {}> {
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
    columnIndex: 6
};
  public projectStartDate: Date = new Date('03/24/2024');
  public projectEndDate: Date = new Date('07/06/2024');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='ColumnMenu' treeColumnIndex={1}
            allowResizing={true} dataSource={projectNewData} highlightWeekends={true} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='ID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='250' minWidth='120' maxWidth='300'></ColumnDirective>
              <ColumnDirective field='StartDate' minWidth= '8' width='135'></ColumnDirective>
              <ColumnDirective field='EndDate' minWidth= '8' width='135'></ColumnDirective>
              <ColumnDirective field='Duration' allowResizing= {false} width='120'></ColumnDirective>
              <ColumnDirective field='Progress' minWidth= '8' headerText='Progress' textAlign='Right' width='120'></ColumnDirective>
              <ColumnDirective field='Predecessor' minWidth= '8' headerText='Dependency' textAlign='Left' width='135'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, Resize]} />
          </GanttComponent>
        </div>
        <div id="action-description">
        <p>This sample demonstrates the Gantt column resizing feature. Click and drag at the right corner of each column header to resize the column.</p>
        </div>

        <div id="description">
        <p>The Gantt columns can be resized by clicking and dragging at the right corner of columns header. Set the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowresizing">allowResizing</a> property to true to enable column resizing behavior in Gantt.
          You can also prevent the resize of a particular column
          by setting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#allowresizing">columns -&gt; allowResizing</a> to false in columns definition
        </p>
        <p> In this demo, the allowResizing feature has been enabled by setting the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowresizing">allowResizing</a> property to true.
          Task Name column can be resized between a range of <code>minWidth (120 pixels)</code> and <code>maxWidth (300 pixels)</code>.
          The column resizing has been disabled in the <b>Duration</b> column
        </p>
        <p>
          <b>Injecting Module:</b>
          <p>Gantt component features are segregated into individual feature-wise modules. To use Resize feature, we need to inject <code>Resize</code> module into the <code>services</code>.</p>
        </p>
        </div>
      </div>
    )
  }
}
