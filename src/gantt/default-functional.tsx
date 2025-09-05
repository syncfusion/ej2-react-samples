import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';

const Default = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance: GanttComponent;
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID:'ParentId'
  };
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const splitterSettings:any= {
      columnIndex: 2
  };
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('07/20/2025');
  const onCreated=(): void=>{
    if(document.querySelector('.e-bigger'))
        {
            ganttInstance.rowHeight=48;
            ganttInstance.taskbarHeight=28;
        }
  }
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='Default' ref={gantt => ganttInstance = gantt} dataSource={projectNewData} treeColumnIndex={1}
          taskFields={taskFields} splitterSettings={splitterSettings} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate} created={onCreated}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='Duration'></ColumnDirective>
            <ColumnDirective field='Progress'></ColumnDirective>
            <ColumnDirective field='Predecessor'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample visualizes the various phases involved in a manufacturing process of a product which transforms from
          a conceptual model to a sellable product.</p>
      </div>
      <div id="description">
        <p>
          In this example, you can see how to render a Gantt Chart with the provided data source. The default timeline
          view week-day mode is applied to Gantt Chart. The dependency lines are enabled in this example to represent the
          execution order or the hierarchy between the phases.
        </p>
        <p>
          Tooltip is enabled for all the UI in this example. To see the tooltip in action, hover the mouse over or tap
          taskbars, timeline units and dependency lines in touch enabled devices.
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a selection support we need to inject the
          <code>Selection</code> module.
        </p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/getting-started#adding-gantt-component">documentation section</a>.</p>
      </div>
    </div>
  )
}
export default Default;