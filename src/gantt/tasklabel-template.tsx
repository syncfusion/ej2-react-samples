import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { labelData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';

export class TasklabelTemplate extends SampleBase<{}, {}> {
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
  public templateLeft: any = this.LeftLabelTemplate;
  public LeftLabelTemplate(props) {
    return(<span>{props.TaskName} [ {props.Progress}% ]</span>);
  };
  public templateRight: any = this.RightLabelTemplate;
  public RightLabelTemplate(props) {
    if(props.ganttProperties.resourceInfo) {
      let resources = props.ganttProperties.resourceInfo;
      let out = [];
    for (let index = 0; index < resources.length; index++) {
        let src = 'src/gantt/images/' + resources[index].resourceName + '.png';
        let img = <img src = {src} height='40px' alt={resources[index].resourceName}/>;
        let span = <span style = {{ marginLeft: '5px' , marginRight: '5px' }}>{resources[index].resourceName}</span>;
        out.push(img,span);
    }
    return (<div>{out}</div>);
    } else {
      return <div></div>
    }
  };
  public labelSettings: any = {
    leftLabel: this.templateLeft.bind(this),
    rightLabel: this.templateRight.bind(this),
    taskLabel: '${Progress}%'
  };
  public splitterSettings: any = {
    position: "35%"
  };
  public projectStartDate: Date = new Date('03/24/2024');
  public projectEndDate: Date = new Date('05/04/2024');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='TasklabelTemplate' dataSource={labelData} highlightWeekends={true}
            rowHeight={46} treeColumnIndex={1} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}
            resourceFields={this.resourceFields} resources={editingResources}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80'></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate' ></ColumnDirective>
              <ColumnDirective field='Duration' ></ColumnDirective>
              <ColumnDirective field='Predecessor' ></ColumnDirective>
              <ColumnDirective field='Progress' ></ColumnDirective>
              <ColumnDirective field='resources' ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample explains the way of rendering label template for left, right, and task labels by mapping template elements to the leftLabel, rightLabel and taskLabel properties in labelSettings.</p>
        </div>

        <div id="description">
        <p>In this demo, the label template is rendered using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/labelSettingsModel/#leftlabel">leftLabel</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/labelSettingsModel/#rightlabel">rightLabel</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/labelSettingsModel/#tasklabel">taskLabel</a> properties in <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#labelsettings">labelSettings</a>.</p>

          <p>Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the
        <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method.To use markers, inject the
        <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.</p>
        </div>
      </div>
    )
  }
}
