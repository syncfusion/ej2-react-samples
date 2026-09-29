import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Edit, Selection, ColumnsDirective, ColumnDirective, EditSettingsModel, LabelSettingsModel, SplitterSettingsModel, TimelineSettingsModel, GridLine } from '@syncfusion/ej2-react-gantt';
import { infiniteTimelineScrollData } from './data';
import { SampleBase } from '../common/sample-base';

export class InfiniteTimelineScroll extends SampleBase<{}, {}> {
  public taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  private ganttInstance: GanttComponent;
  public editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 3
  };
  public gridLines: GridLine = 'Both';
  public timelineSettings: TimelineSettingsModel = {
    topTier: {
      unit: 'Week',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
    },
    viewStartDate: new Date('12/29/2025'),
    viewEndDate: new Date('04/05/2026')
  };
  public labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskID',
    rightLabel: 'TaskName',
    taskLabel: '${Progress}%'
  };
 
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='InfiniteScrolling' ref={gantt => this.ganttInstance = gantt} dataSource={infiniteTimelineScrollData}
            enableInfiniteTimelineScroll={true} treeColumnIndex={1} allowSelection={true}
            highlightWeekends={true} splitterSettings={this.splitterSettings} rowHeight={46}
            taskFields={this.taskFields} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings}
            height='650px' editSettings={this.editSettings} gridLines={this.gridLines} >
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='Duration' ></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Edit, Selection]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates the infinite timeline scrolling feature in the Gantt Chart,
            allowing users to navigate across project timelines without fixed date boundaries.
          </p>
        </div>

        <div id="description">
          <p>
            By enabling the <a target="_blank" rel="noopener noreferrer"
              href="https://ej2.syncfusion.com/react/documentation/api/gantt/#enableinfinitetimelinescroll">
              enableInfiniteTimelineScroll
            </a> property, the timeline dynamically generates additional date ranges as you scroll horizontally.
              When the scroll position reaches the edges of the visible timeline, new segments are rendered automatically,
              ensuring uninterrupted navigation in either direction.
          </p>

          <p>
            More information on the Essential<sup>®</sup> React Gantt Chart can be found in the <a target="_blank"
              href="https://ej2.syncfusion.com/react/documentation/gantt/timeline/timeline#infinite-timeline-scrolling">
              timeline
            </a> documentation section.
          </p>
          <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>

      </div>
    )
  }
}
