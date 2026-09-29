import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, ColumnsDirective, ColumnDirective, ResourceFieldsModel, LabelSettingsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { templateData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';

export class ColumnTemplate extends SampleBase<{}, {}> {

  public columnTemplate(props): any {
    var src = 'src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
    if ((props.ganttProperties.resourceNames)) {
      let gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
      if (gantt.enableRtl) {
        return (
          <div className='columnTemplate'>
            <img src={src} height='40px' width='40px' alt={props.ganttProperties.resourceNames} />
            <div style={{ display: "inline-block", width: '100%', position: "relative", right: "30px" }}>{props.ganttProperties.resourceNames}</div>
          </div>);
      }
      else {
        return (
          <div className='columnTemplate'>
            <img src={src} height='40px' width='40px' alt={props.ganttProperties.resourceNames} />
            <div style={{ display: "inline-block", width: '100%', position: "relative", left: "10px" }}>{props.ganttProperties.resourceNames}</div>
          </div>);
      }
    } else {
      return <div></div>
    }
  }
  public template: any = this.columnTemplate.bind(this);
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
    columnIndex: 3
  };
  public projectStartDate: Date = new Date('03/24/2025');
  public projectEndDate: Date = new Date('06/01/2025');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='ColumnTemplate' rowHeight={60} resourceFields={this.resourceFields} resources={editingResources}
            dataSource={templateData} highlightWeekends={true} treeColumnIndex={1} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='650px' taskbarHeight={25}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='Task ID' width='100' textAlign="Left"></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Name' width='280'></ColumnDirective>
              <ColumnDirective field='resources' headerText='Resources' width='250' template={this.template}></ColumnDirective>
              <ColumnDirective field='StartDate' width='150'></ColumnDirective>
              <ColumnDirective field='Duration' width='150'></ColumnDirective>
              <ColumnDirective field='Progress' width='150'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates column template customization in the Gantt Chart. The Resources column is rendered using a custom template that displays resource images along with their names.</p>
        </div>

        <div id="description">
          <p>The Gantt Chart supports custom column templates through the <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#template">template</a></code> property of a column. Templates enable rich cell rendering with custom HTML content, images, icons, and formatted data. 
            In this example, the Resources column is customized to display resource images together with resource names, providing a more visually informative presentation of assigned resources. Column templates can be used to tailor the appearance of individual cells and create customized layouts based on application requirements.</p>
          <p>Gantt component features are segregated into individual feature-wise modules. To use selection, we need to inject the <code>Selection</code> into the <code>Inject Services</code> section.</p>
          <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/columns/column-template">column template</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    )
  }
}
