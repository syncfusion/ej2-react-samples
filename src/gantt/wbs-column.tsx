import * as React from "react";
import { GanttComponent, Inject, Selection, Toolbar, Edit, Filter, Sort, ContextMenu, DayMarkers, ColumnsDirective, ColumnDirective, EventMarkersDirective, EventMarkerDirective, } from "@syncfusion/ej2-react-gantt";
import { SwitchComponent, ChangeEventArgs } from "@syncfusion/ej2-react-buttons";
import { WBSData } from './data';
import { SampleBase } from "../common/sample-base";
import './wbs-column.css'

export class EnableWbs extends SampleBase<{}, {}> {
  public ganttInstance: any;

  public taskFields: any = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
    progress: "Progress",
    dependency: "Predecessor",
    parentID: 'ParentId'

  };

  public editSettings: any = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };

  public toolbar: any = ["Add", "Edit", "Update", "Delete", "Cancel", "ExpandAll", "CollapseAll"];
  public eventMarkerDay1: Date = new Date('04/02/2025');
  public timelineSettings: any = {
    showTooltip: true,
    topTier: { unit: "Week", format: "dd/MM/yyyy" },
    bottomTier: { unit: "Day", count: 1 },
  };

  public labelSettings: any = {
    taskLabel: '${Progress}%'
  };

  public selectionSettings: any = {
    mode: "Row",
    type: "Single",
    enableToggle: false,
  };

  public splitterSettings: any = {
    columnIndex: 4,
  };

  public filterSettings: any = {
    type: "Menu",
  };

  public tooltipSettings: any = {
    showTooltip: true,
  };

  public projectStartDate: Date = new Date("03/30/2025");
  public projectEndDate: Date = new Date("05/30/2025");
  public dataBound(): void {
    this.ganttInstance.element.getElementsByClassName('e-span-label')[0].style.top = '125px';
    this.ganttInstance.element.getElementsByClassName('e-gantt-right-arrow')[0].style.top = '131px';
  }
  public handleAutoUpdateWBSChange(args: ChangeEventArgs): void {
    if (this.ganttInstance) {
      this.ganttInstance.enableAutoWbsUpdate = args.checked;
    }
  }

  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <div className="col-lg-12">
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div id='wbsswitch' style={{ display: "flex", alignItems: "center" }}>
                <label htmlFor="autoUpdateWBS" style={{ fontSize: "15px", marginRight: "5px" , marginTop: '5px'}}>
                  Auto Update WBS
                </label>
                <SwitchComponent id="autoUpdateWBS" checked={true} change={this.handleAutoUpdateWBSChange.bind(this)} />
              </div>
            </div>

            <GanttComponent
              id="GanttWithWBS"
              ref={(gantt) => (this.ganttInstance = gantt)}
              dataSource={WBSData}
              taskFields={this.taskFields}
              enableWBS={true}
              enableAutoWbsUpdate={true}
              editSettings={this.editSettings}
              treeColumnIndex={2}
              toolbar={this.toolbar}
              dataBound={this.dataBound.bind(this)}
              selectionSettings={this.selectionSettings}
              splitterSettings={this.splitterSettings}
              filterSettings={this.filterSettings}
              tooltipSettings={this.tooltipSettings}
              labelSettings={this.labelSettings}
              timelineSettings={this.timelineSettings}
              highlightWeekends={true}
              allowFiltering={true}
              allowSorting={true}
              allowPdfExport={true}
              allowSelection={true}
              enableContextMenu={true}
              height='650px' taskbarHeight={25} rowHeight={46}
              projectStartDate={this.projectStartDate}
              projectEndDate={this.projectEndDate}
              allowUnscheduledTasks={true}>
              <ColumnsDirective>
                <ColumnDirective field="TaskID" visible={false} />
                <ColumnDirective field="WBSCode" width= '150px'/>
                <ColumnDirective field="TaskName" headerText="Task Name" allowReordering={false} width='260px'  
                />
               <ColumnDirective field="StartDate" headerText="Start Date"  width= '140px'/>
                <ColumnDirective field="WBSPredecessor" headerText="WBS Predecessor" width= '190px'
                />
                <ColumnDirective field="Duration" headerText="Duration" allowEditing={false} width= '130px' />
                <ColumnDirective field="Progress" headerText="Progress" />
              </ColumnsDirective>
              <EventMarkersDirective>
                <EventMarkerDirective day={this.eventMarkerDay1} label='Project Initiation'></EventMarkerDirective>
              </EventMarkersDirective>
              <Inject
                services={[Selection, Toolbar, Edit, Filter, Sort, ContextMenu, DayMarkers,
                ]}
              />
            </GanttComponent>
          </div>
        </div>

        <div id="action-description">
          <p>
            This sample demonstrates how the Gantt Chart supports Work Breakdown Structure (WBS) codes, including
             automatic updates to WBS codes and predecessors. It ensures data consistency during common operations like
              sorting, filtering, editing, and drag-and-drop—making project tracking more structured and reliable.</p>
        </div>

        <div id="description">
          <p>
            The <strong>Work Breakdown Structure (WBS)</strong> is a hierarchical numbering system used to represent each tasks position within the overall project structure.
            By enabling the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#enablewbs">enableWBS </a>{" "} property, the Gantt Chart generates WBS codes and WBS predecessors for all tasks.
          </p>

          <p>
            By default, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#enableautowbsupdate">enableAutoWbsUpdate</a>{" "} property is set to <code>false</code>.
            To ensure WBS codes remain accurate after actions such as sorting, filtering, editing, or drag and drop, set this property to <code>true</code>.
          </p>

          <p>
            When <code>enableAutoWbsUpdate</code> is enabled, WBS codes are recalculated automatically whenever the task hierarchy changes.
            This maintains consistency and structural clarity throughout the project lifecycle.
          </p>

          <p>
            This example showcases how enabling WBS along with automatic updates enhances task tracking and provides a clear, organized project view.
          </p>
        <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/columns/wbs-column">documentation section</a>.</p>
        </div>
      </div>
    );
  }
}
