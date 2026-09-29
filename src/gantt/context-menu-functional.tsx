import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, EditDialogFieldsDirective, DayMarkers, EditDialogFieldDirective, Inject, Edit, Selection, Toolbar, ContextMenuClickEventArgs, IGanttData, ContextMenuOpenEventArgs, Resize, Sort, ContextMenu, ColumnsDirective, ColumnDirective, TaskFieldsModel, ResourceFieldsModel, EditSettingsModel, SplitterSettingsModel, GridLine, ToolbarItem, TimelineSettingsModel, LabelSettingsModel } from '@syncfusion/ej2-react-gantt';
import { contextMenuData, editingResources } from './data';
import { ContextMenuItemModel } from '@syncfusion/ej2-react-grids';
import { updateSampleSection } from '../common/sample-base';

const ContextMenuItem = () => {
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
    parentID: 'ParentId',
    notes: 'info',
    resourceInfo: 'resources'
  };
  const resourceFields: ResourceFieldsModel = {
    id: 'resourceId',
    name: 'resourceName'
  };
  const editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
    allowTaskbarDraw: true
  };
  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 3
  };
  let ganttInstance = useRef<GanttComponent>(null);
  const projectStartDate: Date = new Date('03/25/2025');
  const projectEndDate: Date = new Date('09/08/2025');
  const gridLines: GridLine = 'Both';
  const toolbar: ToolbarItem[] = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
  const timelineSettings: TimelineSettingsModel = {
    topTier: {
      unit: 'Week',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
    },
  };
  const labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName',
    rightLabel: 'resources'
  };
  const contextMenuOpen = (args: ContextMenuOpenEventArgs): void => {
    let record: IGanttData = args.rowData;
    if (args.type !== 'Header' && record) {
      if (!record.hasChildRecords) {
        args.hideItems.push('Collapse the Row');
        args.hideItems.push('Expand the Row');
      } else {
        if (record.expanded) {
          args.hideItems.push('Expand the Row');
        } else {
          args.hideItems.push('Collapse the Row');
        }
      }
    }
  }
  const contextMenuClick = (args: ContextMenuClickEventArgs): void => {
    let record: IGanttData = args.rowData;
    if (args.item.id === 'collapserow') {
      ganttInstance.current.collapseByID(Number(record.ganttProperties.taskId));
    }
    if (args.item.id === 'expandrow') {
      ganttInstance.current.expandByID(Number(record.ganttProperties.taskId));
    }
  }
  const contextMenuItems: any = ['AutoFitAll', 'AutoFit', 'TaskInformation', 'DeleteTask', 'Save', 'Cancel',
    'SortAscending', 'SortDescending', 'Add', 'DeleteDependency', 'Convert', 'Indent', 'Outdent',
    { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' } as ContextMenuItemModel,
    { text: 'Expand the Row', target: '.e-content', id: 'expandrow' } as ContextMenuItemModel];
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='ContextMenu' ref={ganttInstance} dataSource={contextMenuData} dateFormat={'MMM dd, y'} enableContextMenu={true}
          treeColumnIndex={1} allowSelection={true} showColumnMenu={false} highlightWeekends={true} allowSorting={true} allowResizing={true}
          contextMenuItems={contextMenuItems} contextMenuOpen={contextMenuOpen.bind(this)} contextMenuClick={contextMenuClick.bind(this)}
          allowUnscheduledTasks={true} projectStartDate={projectStartDate} projectEndDate={projectEndDate}
          taskFields={taskFields} timelineSettings={timelineSettings} labelSettings={labelSettings} splitterSettings={splitterSettings}
          height='650px' taskbarHeight={25} rowHeight={46} editSettings={editSettings} gridLines={gridLines} toolbar={toolbar} resourceFields={resourceFields} resources={editingResources}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80' visible={false}></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='EndDate'></ColumnDirective>
            <ColumnDirective field='Duration'></ColumnDirective>
            <ColumnDirective field='Progress'></ColumnDirective>
            <ColumnDirective field='Predecessor'></ColumnDirective>
          </ColumnsDirective>
          <EditDialogFieldsDirective>
            <EditDialogFieldDirective type='General' headerText='General'></EditDialogFieldDirective>
            <EditDialogFieldDirective type='Dependency'></EditDialogFieldDirective>
            <EditDialogFieldDirective type='Resources'></EditDialogFieldDirective>
            <EditDialogFieldDirective type='Notes'></EditDialogFieldDirective>
          </EditDialogFieldsDirective>
          <Inject services={[Edit, Selection, Toolbar, DayMarkers, ContextMenu, Resize, Sort]} />
        </GanttComponent>
        <div style={{ float: 'right', margin: '10px' }}>Source:
          <a href="https://en.wikipedia.org/wiki/Construction" target="_blank" rel="noopener noreferrer">https://en.wikipedia.org/wiki/Construction</a>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the various phases involved in constructing a residential house, from testing
          the soil to handing over the fully constructed property to the owner. This also demonstrates the usage of default and custom context menu in Gantt component.
        </p>
      </div>
      <div id="description">
        <p>
          The Gantt Chart provides a context menu that offers quick access to commonly used operations. Context menu support can be enabled by setting the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/index-default#contextmenuitems">contextMenuItems</a> property to <code>true</code>.
        </p>
        <p>Built-in context menu items are available for operations such as task editing, row addition and deletion, sorting, indentation, dependency management, and column auto-fitting. The displayed menu items are automatically adjusted based on the selected target element.</p>
        <p>When <code>allowUnscheduledTasks</code> is enabled, tasks without StartDate, EndDate, or Duration are rendered without a taskbar. Enabling the <code>allowTaskbarDraw</code>property allows these tasks to be scheduled by drawing a taskbar directly in the chart area, which automatically updates the task's scheduling values</p>
        <p>Default items:</p>
        <ul>
          <li><code>AutoFitAll</code> - Auto fit all columns.</li>
          <li><code>AutoFit</code> - Auto fit the current column.</li>
          <li><code>TaskInformation</code> - Edit the current record.</li>
          <li><code>Indent</code> - Indent the selected record to one level</li>
          <li><code>Outdent</code> - Outdent the selected record to one level</li>
          <li><code>DeleteTask</code> - Delete the current record.</li>
          <li><code>Save</code> - Save the edited record.</li>
          <li><code>Cancel</code> - Cancel the edited state.</li>
          <li><code>SortAscending </code> - Sort the current column in ascending order.</li>
          <li><code>SortDescending </code> - Sort the current column in descending order.</li>
          <li><code>DeleteDependency </code> - Delete the dependency of the current record.</li>
          <li><code>Convert </code> - Convert the normal task in to milestone task and vice versa.</li>
          <li><code>Add</code>
            <ul>
              <li><code>Above</code> - Add a new row above the selected row </li>
              <li><code>Below</code> - Add a new row below the selected row</li>
              <li><code>Child</code> - Add a new row as child to the selected row</li>
              <li><code>Milestone</code> - Add a milestone task below to selected row</li>
            </ul>
          </li>
        </ul>
        <p>This sample also demonstrates how to add custom context menu items using the <code>contextMenuItems</code> property.</p>
        <ul>
          <li><code>Expand the Row</code> - Used to expand the parent row when it is in a collapsed state.</li>
          <li><code>Collapse the Row</code> - Used to collapse the parent row when it is in an expanded state.</li>
        </ul>
        <p>Gantt component features are segregated into individual feature-wise modules. To use context menu, edit, toolbar, markers, sort, resize, and selection  features, we need to inject <code>ContextMenu</code>, <code>Edit</code>, <code>Toolbar</code>, <code>DayMarkers</code>, <code>Sort</code>, <code>Resize</code>, and <code>Selection</code>  into the <code>Inject Services</code> section.</p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/context-menu">context menu</a>  documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}
export default ContextMenuItem;
