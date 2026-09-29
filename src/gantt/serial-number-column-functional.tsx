import * as React from 'react';
import { useRef } from 'react';
import { SerialNumberData } from './data';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { GanttComponent, TaskFieldsModel, Inject, Selection, ColumnsDirective, ColumnDirective, RowDD, Toolbar, DayMarkers, Edit, Filter, Sort, ContextMenu, EventMarkersDirective, EventMarkerDirective, EditSettingsModel, TimelineSettingsModel, LabelSettingsModel, SplitterSettingsModel, ToolbarItem, SelectionSettingsModel, TooltipSettingsModel, FilterSettingsModel } from '@syncfusion/ej2-react-gantt';

const EnableSerialNumber = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'

  };
  let ganttObj = useRef<GanttComponent>(null);
 
  const editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };
  const toolbar: ToolbarItem[] = ["Add", "Edit", "Update", "Delete", "Cancel", "Indent", "Outdent", "ExpandAll", "CollapseAll", "Search"];
  const timelineSettings: TimelineSettingsModel = {
    showTooltip: true,
    topTier: {
      unit: "Week",
      format: "dd/MM/yyyy",
    },
    bottomTier: {
      unit: "Day",
      count: 1,
    },
  };
  const labelSettings: LabelSettingsModel = {
    taskLabel: '${Progress}%'
  };
  const projectStartDate: Date = new Date("03/30/2025");
  const projectEndDate: Date = new Date("05/30/2025");
  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 2
  };
  const selectionSettings: SelectionSettingsModel = {
    mode: "Row",
    type: "Single",
    enableToggle: false,
  };
  const tooltipSettings: TooltipSettingsModel = {
    showTooltip: true,
  };
  const filterSettings: FilterSettingsModel = {
    type: "Menu",
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="col-lg-12">
          <div>
            <GanttComponent
              id="EnableSerialNumber"
              ref={ganttObj}
              dataSource={SerialNumberData}
              taskFields={taskFields}
              enableSerialNumber={true}
              editSettings={editSettings}
              treeColumnIndex={2}
              toolbar={toolbar}
              selectionSettings={selectionSettings}
              splitterSettings={splitterSettings}
              filterSettings={filterSettings}
              tooltipSettings={tooltipSettings}
              labelSettings={labelSettings}
              timelineSettings={timelineSettings}
              highlightWeekends={true}
              allowRowDragAndDrop={true}
              allowTaskbarDragAndDrop={true}
              allowFiltering={true}
              allowSorting={true}
              allowSelection={true}
              enableContextMenu={true}
              gridLines={"Both"}
              height='650px' taskbarHeight={25} rowHeight={46}
              projectStartDate={projectStartDate}
              projectEndDate={projectEndDate}
              allowUnscheduledTasks={true}>
              <ColumnsDirective>
                <ColumnDirective field="TaskID" visible={false} />
                <ColumnDirective field="SerialNumber" headerText="S.No" width='100px' allowFiltering={false} />
                <ColumnDirective field="TaskName" headerText="Task Name" allowReordering={false} width='280px'
                />
                <ColumnDirective field="StartDate" headerText="Start Date" width='140px' />
                <ColumnDirective field="Predecessor" headerText="Predecessor" width='190px'
                />
                <ColumnDirective field="Duration" headerText="Duration" allowEditing={false} width='130px' />
                <ColumnDirective field="Progress" headerText="Progress" />
              </ColumnsDirective>

              <Inject
                services={[Selection, Toolbar, Edit, Filter, Sort, ContextMenu, DayMarkers, RowDD
                ]}
              />
            </GanttComponent>
          </div>
        </div>
      </div>

      <div id="action-description">
          <p>
            This sample demonstrates the auto-generated Serial Number column support in the Gantt Chart.
            The component automatically generates sequential row numbers based on the current visible row order
            and keeps them updated during operations such as filtering, editing, hierarchy changes,
            and drag-and-drop actions.
          </p>
        </div>

        <div id="description"> 
          <p>
            The serial number feature automatically generates sequential row numbers for records displayed in the Gantt Chart. When the <strong>
            <a target="_blank"
            href="https://ej2.syncfusion.com/react/documentation/api/gantt/#enableserialnumber">enableSerialNumber</a>
            </strong> property is enabled, serial numbers are assigned based on the current visible row order without requiring a dedicated field in the data source.
          </p>

          <p>
            The numbering is automatically updated whenever the row order changes due to actions such as filtering, searching, expand and collapse, indent and outdent, CRUD operations, row drag-and-drop, and data refresh.
          </p>

          <p style={{ fontWeight: '500' }}>Injecting Module:</p>

          <p>
            Gantt component features are segregated into individual feature-wise modules. To use selection, toolbar,
            editing, filtering, sorting, row drag-and-drop, and virtualization features, inject the
            <code>Selection</code>, <code>Toolbar</code>, <code>Edit</code>, <code>Filter</code>,
            <code>Sort</code>, and <code>RowDD</code> modules using the
            <code>Gantt.Inject(Selection)</code>, <code>Gantt.Inject(Toolbar)</code>,
            <code>Gantt.Inject(Edit)</code>, <code>Gantt.Inject(Filter)</code>,
            <code>Gantt.Inject(Sort)</code>, and <code>Gantt.Inject(RowDD)</code> methods.
          </p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/columns/serial-number-column">serial number columns</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  );
};
export default EnableSerialNumber;

