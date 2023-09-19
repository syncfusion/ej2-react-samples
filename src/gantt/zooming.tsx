import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Toolbar, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { zoomingData } from './data';
import { SampleBase } from '../common/sample-base';

export class Zooming extends SampleBase<{}, {}> {
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
  public splitterSettings: any ={
   position: "35%"
  };
  public toolbar: any = ['ZoomIn','ZoomOut','ZoomToFit'];
  public projectStartDate: Date = new Date('03/24/2019');
  public projectEndDate: Date = new Date('04/28/2019');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Zooming' dataSource={zoomingData} toolbar={this.toolbar}
            treeColumnIndex={1} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80'></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate' ></ColumnDirective>
              <ColumnDirective field='Duration' ></ColumnDirective>
              <ColumnDirective field='Progress' ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Toolbar]} />
          </GanttComponent>
        </div>
      <div id="action-description">
      <p>This sample visualizes the various phases involved in the manufacturing process of a product,
        which transforms from a conceptual model to a sellable product.</p>
      </div>

      <div id="description">
          <p>
        The sample demonstrates the zooming support in Gantt chart. 
            You can zoom in or zoom out the project timeline dynamically with following toolbar buttons.

        <li><code>ZoomIn</code> - To perform zoom in action on Gantt timeline.</li>
        <li><code>ZoomOut </code> - To perform zoom out action on Gantt timeline.</li>
        <li><code>ZoomToFit </code> - To show all tasks with timeline fit into available chart width.</li>
        
        The zooming feature enables you to view the tasks in the project clearly from minute to year timespan. You need to include 
        <code>ZoomIn</code>, <code>ZoomOut </code> and <code>ZoomToFit </code> buttons in the toolbar for performing zooming actions in Gantt chart.
        <li><code>ZoomIn</code> - If the user clicks on the <code>ZoomIn</code> icon we have increased the timeline cell width, 
            when the cell size exceeds the specified range then we have changed the timeline view mode.</li>
        <li><code>ZoomOut </code> - If the user clicks on the <code>ZoomOut</code> icon we have decrease the timeline cell width, when the cell size falls
             behind the specified range then we have changed the timeline view mode based on the zooming levels.</li>
        <li><code>ZoomToFit </code> - In project, if the tasks are rendered in different time ranges, when the user clicks on the  <code>ZoomToFit</code> icon, 
            then all the tasks are rendered within the current viewable chart container width.</li>
    </p>
    <p>
        To use a zoom support related icons, inject the <code>Toolbar</code> module into the <code>services</code>.
    </p>
    </div>
    </div>
    )
  }
}
