import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection,DayMarkers, ColumnsDirective, ColumnDirective, LabelSettingsModel, ResourceFieldsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { templateData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';
import './header-template.css'

export class HeaderTemplate extends SampleBase<{}, {}> {
  public taskFields: TaskFieldsModel = {
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
  public resourceFields: ResourceFieldsModel = {
    id: 'resourceId',
    name: 'resourceName'
  };
  public labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName'
  };
  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 4
  };
  public projectStartDate: Date = new Date('03/24/2025');
  public projectEndDate: Date = new Date('07/06/2025');

  public taskNameHeaderTemplate() {
    return(
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="gantttaskName"></div>
        <b className='e-header'>Task Name</b>
      </div>
    )
  }

  public startDateHeaderTemplate() {
    return(
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="ganttstartDate"></div>
        <b className='e-header'>Start Date</b>
      </div>
    )
  }

  public resourceHeaderTemplate() {
    return(
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <div className="ganttresource"></div>
        <b className='e-header'>Resources</b>
      </div>
    )
  }

  public durationHeaderTemplate() {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="ganttduration"></div>
        <b className='e-header'>Duration</b>
      </div>
    )
  }

  public progressHeaderTemplate() {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="ganttprogressTemplate"></div>
        <b className='e-header'>Progress</b>
      </div>
    )
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='HeaderTemplate' resourceFields={this.resourceFields} resources={editingResources}
            dataSource={templateData} highlightWeekends={true} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskName' headerText='Job Name'
                headerTemplate={this.taskNameHeaderTemplate.bind(this)}
                width='250'
              ></ColumnDirective>
              <ColumnDirective field='StartDate'
                headerTemplate={this.startDateHeaderTemplate.bind(this)}
              ></ColumnDirective>
              <ColumnDirective field='resources'
                headerTemplate={this.resourceHeaderTemplate.bind(this)}
              ></ColumnDirective>
              <ColumnDirective field='Duration'
                headerTemplate={this.durationHeaderTemplate.bind(this)}
              ></ColumnDirective>
              <ColumnDirective field='Progress'
                headerTemplate={this.progressHeaderTemplate.bind(this)}
              ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the Gantt header template feature. In this sample, custom icons have been shown in the column headers.</p>
        </div>

        <div id="description">
          <p>The Gantt provides a way to define a custom element in header element. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#headertemplate">columns -&gt; headerTemplate</a> property accepts the template for the header cell.</p>
          <p>In this demo, we have rendered the customized template for all column headers.</p>
          <p>Gantt component features are segregated into individual feature-wise modules. To use selection feature, we need to inject the <code>Selection</code> into the <code>Inject Services</code> section.</p>
          <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/columns/column-headers#customize-header-using-template">columns</a> documentation section.</p>
          <br/>
          <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    )
  }
}
