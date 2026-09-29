import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective, ResourceFieldsModel, LabelSettingsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { labelData, editingResources } from './data';
import { updateSampleSection } from '../common/sample-base';

const TasklabelTemplate = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: TaskFieldsModel = {
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
  const resourceFields: ResourceFieldsModel = {
    id: 'resourceId',
    name: 'resourceName'
  };
  const LeftLabelTemplate = (props: any) => {
    return (<span>{props.TaskName} [ {props.Progress}% ]</span>);
  };
  const templateLeft: any = LeftLabelTemplate;
  const RightLabelTemplate = (props: any) => {
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
  const labelSettings: LabelSettingsModel = {
    leftLabel: templateLeft.bind(this),
    rightLabel: templateRight.bind(this),
    taskLabel: '${Progress}%'
  };
  const splitterSettings: SplitterSettingsModel = {
    position: "35%"
  };
  const projectStartDate: Date = new Date('03/24/2025');
  const projectEndDate: Date = new Date('06/10/2025');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='TasklabelTemplate' dataSource={labelData} highlightWeekends={true}
          rowHeight={46} treeColumnIndex={1} splitterSettings={splitterSettings}
          taskFields={taskFields} labelSettings={labelSettings} height='650px' taskbarHeight={25}
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
        <p>The Gantt Chart supports custom label templates through the <code>labelSettings</code> property. Labels can be displayed on the left side, right side, and inside taskbars to provide additional task information. In this example, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/labelSettingsModel/#leftlabel">leftLabel</a> displays the task name and progress, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/labelSettingsModel/#tasklabel">taskLabel</a> displays the current progress percentage, and the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/labelSettingsModel/#rightlabel">rightLabel</a> displays assigned resource information with custom images and names.</p>
        <p>Gantt component features are segregated into individual feature-wise modules.To use a selection and marker features, we need to inject the <code>Selection</code> and <code>DayMarkers</code> into the <code>Inject Services</code> section.</p>
        <br />
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/labels#customize-labels-with-templates">label template</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}
export default TasklabelTemplate;
