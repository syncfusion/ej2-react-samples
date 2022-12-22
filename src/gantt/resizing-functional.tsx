import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, Resize, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';

function Resizing() {
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
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const splitterSettings: any = {
    columnIndex: 6
  };
  const projectStartDate: Date = new Date('03/24/2019');
  const projectEndDate: Date = new Date('07/06/2019');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='ColumnMenu' treeColumnIndex={1}
          allowResizing={true} dataSource={projectNewData} highlightWeekends={true} splitterSettings={splitterSettings}
          taskFields={taskFields} labelSettings={labelSettings} height='410px'
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' headerText='ID' width='80' ></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Job Name' width='250' minWidth='120' maxWidth='300'></ColumnDirective>
            <ColumnDirective field='StartDate' minWidth='8' width='135'></ColumnDirective>
            <ColumnDirective field='EndDate' minWidth='8' width='135'></ColumnDirective>
            <ColumnDirective field='Duration' allowResizing={false} width='120'></ColumnDirective>
            <ColumnDirective field='Progress' minWidth='8' headerText='Progress' textAlign='Right' width='120'></ColumnDirective>
            <ColumnDirective field='Predecessor' minWidth='8' headerText='Dependency' textAlign='Left' width='135'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, Resize]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the Gantt column resizing feature. Click and drag at the right corner of each column header to resize the column.</p>
      </div>

      <div id="description">
        <p>The Gantt columns can be resized by clicking and dragging at the right corner of columns header. Set the <code>allowResizing</code> property to true to enable column resizing behavior in Gantt.
          You can also prevent the resize of a particular column
          by setting <code>columns -&gt; allowResizing</code> to false in columns definition
        </p>

        <p> In this demo, the allowResizing feature has been enabled by setting the <code>allowResizing</code> property to true.
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
export default Resizing;
