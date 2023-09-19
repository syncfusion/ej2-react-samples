import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, Filter, Toolbar, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import './toolbar-template.css'

const ToolbarTemplate = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance = useRef<GanttComponent>(null);
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  const toolbar: any = ['ExpandAll', 'CollapseAll', { text: 'Quick Filter', tooltipText: 'Quick Filter', id: 'Quick Filter', prefixIcon: 'e-quickfilter' }, { text: 'Clear Filter', tooltipText: 'Clear Filter', id: 'Clear Filter' }];
  const splitterSettings: any = {
    columnIndex: 2
  };
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const projectStartDate: Date = new Date('03/24/2019');
  const projectEndDate: Date = new Date('07/06/2019');

  const toolbarClick = (args: ClickEventArgs): void => {
    if (args.item.text === 'Quick Filter') {
      ganttInstance.current.filterByColumn('TaskName', 'startswith', 'Identify');
    }
    if (args.item.text === 'Clear Filter') {
      ganttInstance.current.clearFiltering();
    }
  }
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='ToolbarTemplate' ref={ganttInstance} dataSource={projectNewData} highlightWeekends={true}
            allowFiltering={true} treeColumnIndex={1} splitterSettings={splitterSettings}
            toolbar={toolbar} toolbarClick={toolbarClick.bind(this)}
            taskFields={taskFields} labelSettings={labelSettings} height='410px'
            projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers, Filter, Toolbar]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample explains the way of rendering built-in and custom toolbar items at the same time.</p>
        </div>
        <div id="description">
          <p>Custom toolbar items can be added by defining the toolbar as a collection of ItemModels.
        Actions for this customized toolbar items are defined in the <code>toolbarClick</code> event.</p>
          <p>In this sample, the custom toolbar element <code>Quick Filter</code> and <code>Clear Filter</code> is rendered along with predefined toolbar items ExpandAll and CollapseAll.
        While clicking the <code>Quick Filter</code> toolbar item, the filtering occurs for <code>Task Name</code>column.Filtered column can be cleared using <code>Clear Filter</code> toolbar item.</p>
          <p>Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the
        <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method.To use a filter, inject the
        <code>Filter</code> module using the <code>Gantt.Inject(Filter)</code> method.To use a toolbar, inject the
        <code>Toolbar</code> module using the <code>Gantt.Inject(Toolbar)</code> method.To use markers, inject the
        <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.</p>
        </div>
      </div>
    )
  }
export default ToolbarTemplate;
