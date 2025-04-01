import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { labelData, editingResources } from './data';
import { updateSampleSection } from '../common/sample-base';

const TasklabelTemplate = () => {
  useEffect(() => {
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
    resourceInfo: 'resources',
    child: 'subtasks'
  };
  const resourceFields: any = {
    id: 'resourceId',
    name: 'resourceName'
  };
  const LeftLabelTemplate = (props) => {
    return (<span>{props.TaskName} [ {props.Progress}% ]</span>);
  };
  const templateLeft: any = LeftLabelTemplate;
  const RightLabelTemplate = (props) => {
    if (props.ganttProperties.resourceInfo) {
      let resources = props.ganttProperties.resourceInfo;
      let out = [];
      for (let index = 0; index < resources.length; index++) {
        let src = 'src/gantt/images/' + resources[index].resourceName + '.png';
        let img = (
          <img
            key={`img-${index}`}
            src={src}
            height="40px"
            alt={resources[index].resourceName}
          />
        );
        let span = (
          <span
            key={`span-${index}`}
            style={{ marginLeft: '5px', marginRight: '5px' }}
          >
            {resources[index].resourceName}
          </span>
        );
        out.push(img, span);
      }
      return (<div>{out}</div>);
    } else {
      return <div></div>
    }
  };  
  const templateRight: any = RightLabelTemplate;  
  const labelSettings: any = {
    leftLabel: templateLeft.bind(this),
    rightLabel: templateRight.bind(this),
    taskLabel: '${Progress}%'
  };
  const splitterSettings: any = {
    position: "35%"
  };
  const projectStartDate: Date = new Date('03/24/2024');
  const projectEndDate: Date = new Date('05/04/2024');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='TasklabelTemplate' dataSource={labelData} highlightWeekends={true}
          rowHeight={46} treeColumnIndex={1} splitterSettings={splitterSettings}
          taskFields={taskFields} labelSettings={labelSettings} height='410px'
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}
          resourceFields={resourceFields} resources={editingResources}>
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
export default TasklabelTemplate;
