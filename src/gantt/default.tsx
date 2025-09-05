import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';

export class Default extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
     parentID:'ParentId'
  };
  private ganttInstance: GanttComponent;
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public splitterSettings:any= {
      columnIndex: 2
  };
  public onCreated=(): void=>{
    if(document.querySelector('.e-bigger'))
      {
          this.ganttInstance.rowHeight=48;
          this.ganttInstance.taskbarHeight=28;
      }
  }
  public projectStartDate: Date = new Date('03/26/2025');
  public projectEndDate: Date = new Date('07/20/2025');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Default' ref={gantt=>this.ganttInstance=gantt} dataSource={projectNewData} treeColumnIndex={1}
            taskFields={this.taskFields} splitterSettings={this.splitterSettings} labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} created={this.onCreated}>
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
}
