import * as ReactDOM from "react-dom";
import * as React from "react";
import { useRef } from 'react';
import {ChangeEventArgs,SwitchComponent} from "@syncfusion/ej2-react-buttons";
import { WBSData } from './data';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import {GanttComponent,Inject,Selection,ColumnsDirective,ColumnDirective,Toolbar,DayMarkers,Edit,Filter,Sort,ContextMenu, EventMarkersDirective, EventMarkerDirective,} from "@syncfusion/ej2-react-gantt";

const EnableWbs = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: any = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
    progress: "Progress",
    dependency: "Predecessor",
    parentID: 'ParentId'

  };
  let ganttInstance = useRef<GanttComponent>(null);
  const eventMarkerDay1: Date = new Date('04/02/2024');
  const autoUpdateWBSChange = (args: ChangeEventArgs): void => {
    if (args.checked) {
      ganttInstance.current.enableAutoWbsUpdate = true;
    } else {
      ganttInstance.current.enableAutoWbsUpdate = false;
    }
  };
  const editSettings: any = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };
  const toolbar: any = ["Add","Edit","Update","Delete","Cancel","ExpandAll","CollapseAll"];
  const timelineSettings: any = {
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
  const labelSettings: any = {
    taskLabel: '${Progress}%'
  };
  const projectStartDate: Date = new Date("03/31/2024");
  const projectEndDate: Date = new Date("05/30/2024");
  const splitterSettings: any = {
    columnIndex: 4
  };
  const dataBound = (): void => {
    var gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
    (gantt.element.getElementsByClassName('e-span-label')[0] as HTMLElement).style.top = '125px';
    (gantt.element.getElementsByClassName('e-gantt-right-arrow')[0] as HTMLElement).style.top = '131px';
  }
  const selectionSettings: any = {
    mode: "Row",
    type: "Single",
    enableToggle: false,
  };
  const tooltipSettings: any = {
    showTooltip: true,
  };
  const filterSettings: any = {
    type: "Menu",
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="col-lg-12">
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="autoUpdateWBS" style={{ fontSize: "15px", marginRight: "5px" }}>
                Auto Update WBS
              </label>
              <SwitchComponent
                id="autoUpdateWBS"
                checked={true}
                change={autoUpdateWBSChange}
              />
            </div>
          </div>
          <div>
            <GanttComponent
              id="EnableWbs"
              taskFields={taskFields}
              ref={ganttInstance}
              toolbar={toolbar}
              treeColumnIndex={2}
              dataSource={WBSData}
              allowSorting={true}
              enableContextMenu={true}
              enableWBS={true}
              dataBound={dataBound.bind(this)}
              enableAutoWbsUpdate={true}
              editSettings={editSettings}
              allowSelection={true}
              allowPdfExport={true}
              splitterSettings={splitterSettings}
              selectionSettings={selectionSettings}
              tooltipSettings={tooltipSettings}
              filterSettings={filterSettings}
              timelineSettings={timelineSettings}
              highlightWeekends={true}
              allowFiltering={true}
              gridLines={"Both"}
              labelSettings={labelSettings}
              taskbarHeight={20}
              rowHeight={40}
              height={"550px"}
              allowUnscheduledTasks={true}
              projectStartDate={projectStartDate}
              projectEndDate={projectEndDate}
            >
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
                <EventMarkerDirective day={eventMarkerDay1} label='Project Initiation'></EventMarkerDirective>
            </EventMarkersDirective>
              <Inject services={[   Selection,   DayMarkers,   Toolbar,   Edit,   Filter,   Sort,   ContextMenu, ]}/>
            </GanttComponent>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>
         This sample demonstrates how the Gantt Chart supports Work Breakdown Structure (WBS) codes, including 
         automatic updates to WBS codes and predecessors. It ensures data consistency during common operations like
          sorting, filtering, editing, and drag-and-drop—making project tracking more structured and reliable.
        </p>
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
      </div>
    </div>
  );
};
export default EnableWbs;

