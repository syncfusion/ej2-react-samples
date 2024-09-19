import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { templateData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';
import './header-template.css'

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
        <div className='control-section'>
          <GanttComponent id='ColumnMenu' resourceFields={this.resourceFields} resources={editingResources}
            dataSource={templateData} highlightWeekends={true} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' headerTemplate={() =>{
                 return (<div><img className="gantttaskName" width="20" height="20" alt='TaskName'/>
                 <b className='e-header'>Task Name</b></div>);
              }} width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'  headerTemplate={() =>{
                 return (<div><img className="ganttstartDate" width="20" height="20" alt='StartDate'/>
                 <b className='e-header'>Start Date</b></div>);
              }}></ColumnDirective>
              <ColumnDirective field='resources'  headerTemplate={() =>{
                 return (<div><img className="ganttresource" width="20" height="20" alt='Resources'/>
                 <b className='e-header'>Resources</b></div>);
              }}></ColumnDirective>
              <ColumnDirective field='Duration'  headerTemplate={() =>{
                 return (<div><img className="ganttduration" width="20" height="20" alt='Duration'/>
                 <b className='e-header'>Duration</b></div>);
              }}></ColumnDirective>
              <ColumnDirective field='Progress'  headerTemplate={() =>{
                 return (<div><img className="ganttprogressTemplate" width="20" height="20" alt='Progress'/>
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
        <p>The Gantt provides a way to define a custom element in header element. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#headertemplate">columns -&gt; headerTemplate</a> property accepts the template for the header cell.</p>
        <p>In this demo, we have rendered the customized template for all column headers.</p> 
    </div>
      </div>
    )
  }
}
