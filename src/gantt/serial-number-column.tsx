import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, Toolbar, Edit, Filter, Sort, ContextMenu, DayMarkers, ColumnsDirective, ColumnDirective, EditSettingsModel, LabelSettingsModel, SplitterSettingsModel, TimelineSettingsModel, ToolbarItem, SelectionSettingsModel, FilterSettingsModel, TooltipSettingsModel, RowDD } from '@syncfusion/ej2-react-gantt';
import { SerialNumberData } from './data';
import { SampleBase } from '../common/sample-base';

export class EnableSerialNumber extends SampleBase<{}, {}> {
  public ganttInstance: GanttComponent;

  public taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'
  };

  public editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };

  public toolbar: ToolbarItem[] = ["Add", "Edit", "Update", "Delete", "Cancel", "Indent", "Outdent", "ExpandAll", "CollapseAll", "Search"];
  public timelineSettings: TimelineSettingsModel = {
    showTooltip: true,
    topTier: { unit: "Week", format: "dd/MM/yyyy" },
    bottomTier: { unit: "Day", count: 1 },
  };

  public labelSettings: LabelSettingsModel = {
    taskLabel: '${Progress}%'
  };

  public selectionSettings: SelectionSettingsModel = {
    mode: "Row",
    type: "Single",
    enableToggle: false,
  };

  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 2,
  };

  public filterSettings: FilterSettingsModel = {
    type: "Menu",
  };

  public tooltipSettings: TooltipSettingsModel = {
    showTooltip: true,
  };

  public projectStartDate: Date = new Date("03/30/2025");
  public projectEndDate: Date = new Date("05/30/2025");

  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <div className="col-lg-12">
            <div>
              <GanttComponent
                id="EnableSerialNumber"
                ref={(gantt) => (this.ganttInstance = gantt)}
                dataSource={SerialNumberData}
                taskFields={this.taskFields}
                enableSerialNumber={true}
                editSettings={this.editSettings}
                treeColumnIndex={2}
                toolbar={this.toolbar}
                selectionSettings={this.selectionSettings}
                splitterSettings={this.splitterSettings}
                filterSettings={this.filterSettings}
                tooltipSettings={this.tooltipSettings}
                labelSettings={this.labelSettings}
                timelineSettings={this.timelineSettings}
                highlightWeekends={true}
                allowRowDragAndDrop={true}
                allowTaskbarDragAndDrop={true}
                allowFiltering={true}
                allowSorting={true}
                allowSelection={true}
                enableContextMenu={true}
                gridLines={"Both"}
                height='650px' taskbarHeight={25} rowHeight={46}
                projectStartDate={this.projectStartDate}
                projectEndDate={this.projectEndDate}
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
  }
}
