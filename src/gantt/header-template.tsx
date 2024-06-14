import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { templateData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
.material img.resource, .fabric img.resource, .bootstrap img.resource,
.tailwind img.resource, .bootstrap5 img.resource, .bootstrap4 img.resource,
.fluent img.resource,.fluent2 img.resource,.material3 img.resource{
    content: url("src/gantt/images/Resources.png");
}
.material-dark img.resource, .fabric-dark img.resource, .bootstrap-dark img.resource,
.tailwind-dark img.resource, .bootstrap5-dark img.resource, .highcontrast img.resource,
.fluent-dark img.resource,.fluent2-dark img.resource,.fluent2-highcontrast img.resource,.material3-dark img.resource{
    content: url("src/gantt/images/ResourcesDark.png");
}
.material img.taskName, .fabric img.taskName, .bootstrap img.taskName,
.tailwind img.taskName, .bootstrap5 img.taskName, .bootstrap4 img.taskName,
.fluent img.taskName,.fluent2 img.taskName,.material3 img.taskName,.material3 img.taskName{
    content: url("src/gantt/images/Task name.png");
}
.material-dark img.taskName, .fabric-dark img.taskName, .bootstrap-dark img.taskName,
.tailwind-dark img.taskName, .bootstrap5-dark img.taskName, .highcontrast img.taskName,
.fluent-dark img.taskName,.fluent2-dark img.taskName,.fluent2-highcontrast img.taskName,.material3-dark img.taskName{
    content: url("src/gantt/images/TaskNameDark.png");
}
.material img.startDate, .fabric img.startDate, .bootstrap img.startDate,
.tailwind img.startDate, .bootstrap5 img.startDate, .bootstrap4 img.startDate,
.fluent img.startDate,.fluent2 img.startDate,.material3 img.startDate{
    content: url("src/gantt/images/Start date.png");
}
.material-dark img.startDate, .fabric-dark img.startDate, .bootstrap-dark img.startDate,
.tailwind-dark img.startDate, .bootstrap5-dark img.startDate, .highcontrast img.startDate,
.fluent-dark img.startDate,.fluent2-dark img.startDate,.fluent2-highcontrast img.startDate,.material3-dark img.startDate{
    content: url("src/gantt/images/StartDateDark.png");
}
.material img.duration, .fabric img.duration, .bootstrap img.duration,
.tailwind img.duration, .bootstrap5 img.duration, .bootstrap4 img.duration,
.fluent img.duration,.fluent2 img.duration,.material3 img.duration{
    content: url("src/gantt/images/Duration.png");
}
.material-dark img.duration, .fabric-dark img.duration, .bootstrap-dark img.duration,
.tailwind-dark img.duration, .bootstrap5-dark img.duration, .highcontrast img.duration,
.fluent-dark img.duration,.fluent2-dark img.duration,.fluent2-highcontrast img.duration, .material3-dark img.duration{
    content: url("src/gantt/images/DurationDark.png");
}
.material img.progressTemplate, .fabric img.progressTemplate, .bootstrap img.progressTemplate,
.tailwind img.progressTemplate, .bootstrap5 img.progressTemplate, .bootstrap4 img.progressTemplate,
.fluent img.progressTemplate,.fluent2 img.progressTemplate,.material3 img.progressTemplate{
    content: url("src/gantt/images/Progress.png");
}
.material-dark img.progressTemplate, .fabric-dark img.progressTemplate, .bootstrap-dark img.progressTemplate,
.tailwind-dark img.progressTemplate, .bootstrap5-dark img.progressTemplate, .highcontrast img.progressTemplate,
.fluent-dark img.progressTemplate,.fluent2-dark img.progressTemplate,.fluent2-highcontrast img.progressTemplate,.material3-dark img.progressTemplate{
    content: url("src/gantt/images/ProgressDark.png");
}
img.resource, img.taskName, img.startDate, img.duration, img.progressTemplate{
    margin-right: 8px;
    display: inline-block;
}`;

export class HeaderTemplate extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    resourceInfo: 'resources',
    child: 'subtasks'
  };
  public resourceFields: any = {
    id: 'resourceId',
    name: 'resourceName'
  };
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public splitterSettings: any = {
    columnIndex: 4
};
  public projectStartDate: Date = new Date('03/24/2024');
  public projectEndDate: Date = new Date('07/06/2024');
  render() {
    return (
    <div className='control-pane'>
        <style>
        {SAMPLE_CSS}
        </style>
        <div className='control-section'>
          <GanttComponent id='ColumnMenu' resourceFields={this.resourceFields} resources={editingResources}
            dataSource={templateData} highlightWeekends={true} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' headerTemplate={() =>{
                 return (<div><img className="taskName" width="20" height="20" alt='TaskName'/>
                 <b className='e-header'>Task Name</b></div>);
              }} width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'  headerTemplate={() =>{
                 return (<div><img className="startDate" width="20" height="20" alt='StartDate'/>
                 <b className='e-header'>Start Date</b></div>);
              }}></ColumnDirective>
              <ColumnDirective field='resources'  headerTemplate={() =>{
                 return (<div><img className="resource" width="20" height="20" alt='Resources'/>
                 <b className='e-header'>Resources</b></div>);
              }}></ColumnDirective>
              <ColumnDirective field='Duration'  headerTemplate={() =>{
                 return (<div><img className="duration" width="20" height="20" alt='Duration'/>
                 <b className='e-header'>Duration</b></div>);
              }}></ColumnDirective>
              <ColumnDirective field='Progress'  headerTemplate={() =>{
                 return (<div><img className="progressTemplate" width="20" height="20" alt='Progress'/>
                 <b className='e-header'>Progress</b></div>);
              }}></ColumnDirective>
             </ColumnsDirective>
            <Inject services={[Selection]} />
          </GanttComponent>
        </div>
        <div id="action-description">
        <p>This sample demonstrates the Gantt header template feature. In this sample, custom icons have been shown in the column headers.</p>
        </div>

        <div id="description">
        <p>The Gantt provides a way to define a custom element in header element. The <code>columns -&gt; headerTemplate</code> property accepts the template for the header cell.</p>
        <p>In this demo, we have rendered the customized template for all column headers.</p> 
    </div>
      </div>
    )
  }
}
