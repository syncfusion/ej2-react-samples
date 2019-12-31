import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { templateData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .e-header {
        margin-left: 8px;
    }`;
export class HeaderTemplate extends SampleBase {
    constructor() {
        super(...arguments);
        this.taskFields = {
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
        this.labelSettings = {
            leftLabel: 'TaskName'
        };
        this.splitterSettings = {
            columnIndex: 4
        };
        this.projectStartDate = new Date('03/24/2019');
        this.projectEndDate = new Date('07/06/2019');
    }
    render() {
        return (<div className='control-pane'>
        <style>
        {SAMPLE_CSS}
        </style>
        <div className='control-section'>
          <GanttComponent id='ColumnMenu' resourceNameMapping='resourceName' resourceIDMapping='resourceId' resources={editingResources} dataSource={templateData} highlightWeekends={true} splitterSettings={this.splitterSettings} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px' projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' headerTemplate={() => {
            return (<div><img src="src/gantt/images/Task name.png" width="20" height="20" className="e-image"/>
                 <b className='e-header'>Task Name</b></div>);
        }} width='250'></ColumnDirective>
              <ColumnDirective field='StartDate' headerTemplate={() => {
            return (<div><img src="src/gantt/images/Start date.png" width="20" height="20" className="e-image"/>
                 <b className='e-header'>Start Date</b></div>);
        }}></ColumnDirective>
              <ColumnDirective field='resources' headerTemplate={() => {
            return (<div><img src="src/gantt/images/Resources.png" width="20" height="20" className="e-image"/>
                 <b className='e-header'>Resources</b></div>);
        }}></ColumnDirective>
              <ColumnDirective field='Duration' headerTemplate={() => {
            return (<div><img src="src/gantt/images/Duration.png" width="20" height="20" className="e-image"/>
                 <b className='e-header'>Duration</b></div>);
        }}></ColumnDirective>
              <ColumnDirective field='Progress' headerTemplate={() => {
            return (<div><img src="src/gantt/images/Progress.png" width="20" height="20" className="e-image"/>
                 <b className='e-header'>Progress</b></div>);
        }}></ColumnDirective>
             </ColumnsDirective>
            <Inject services={[Selection]}/>
          </GanttComponent>
        </div>
        <div id="action-description">
        <p>This sample demonstrates the Gantt header template feature. In this sample, custom icons have been shown in the column headers.</p>
        </div>

        <div id="description">
        <p>The Gantt provides a way to define a custom element in header element. The <code>columns -> headerTemplate</code> property accepts the template for the header cell.</p>
        <p>In this demo, we have rendered the customized template for all column headers.</p> 
    </div>
      </div>);
    }
}
