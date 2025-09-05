import * as React from 'react';
import {
  GanttComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Selection,
  Toolbar,
  DayMarkers,
  Edit,
} from '@syncfusion/ej2-react-gantt';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';

import { constraintData } from './data';

const Constraints = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const getConstraintText = (value: number | string) => {
    const map: Record<number, string> = {
      0: "As Soon As Possible",
      1: "As Late As Possible",
      2: "Must Start On",
      3: "Must Finish On",
      4: "Start No Earlier Than",
      5: "Start No Later Than",
      6: "Finish No Earlier Than",
      7: "Finish No Later Than",
    };
    const numValue = typeof value === "string" ? parseInt(value) : value;
    return map[numValue] || "Unknown";
  };

  const taskFields = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
    progress: "Progress",
    constraintType: "ConstraintType",
    constraintDate: "ConstraintDate",
    dependency: "Predecessor",
    parentID: "parentID",
    notes: "info",
  };

  const editSettings = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };

  const toolbar = [
    "Add",
    "Edit",
    "Update",
    "Delete",
    "Cancel",
    "ExpandAll",
    "CollapseAll",
    "Indent",
    "Outdent",
  ];
  const RightLabelTemplate = (props) => {
      getConstraintText(props.ganttProperties.constraintType)
  };  
  const templateRight: any = RightLabelTemplate;  
  const labelSettings = {
    leftLabel: "TaskName",
    rightLabel: templateRight.bind(this)
  };

  const splitterSettings = {
    columnIndex: 4,
  };

  const projectStartDate = new Date("03/25/2025");
  const projectEndDate = new Date("09/28/2025");

  const eventMarkers = [
    { day: new Date("03/25/2025"), label: "Project StartDate" },
    { day: new Date("08/31/2025"), label: "Project EndDate" },
  ];


  return (
    <div className="control-pane">
      <div className="control-section">
        <GanttComponent
          id="Constraint"
          dataSource={constraintData}
          taskFields={taskFields}
          editSettings={editSettings}
          toolbar={toolbar}
          allowSelection={true}
          gridLines="Both"
          highlightWeekends={true}
          height='650px' taskbarHeight={25} rowHeight={46}
          treeColumnIndex={1}
          labelSettings={labelSettings}
          splitterSettings={splitterSettings}
          projectStartDate={projectStartDate}
          projectEndDate={projectEndDate}
          eventMarkers={eventMarkers}
        >
          <ColumnsDirective>
            <ColumnDirective field="TaskID" visible={false} />
            <ColumnDirective
              field="TaskName"
              headerText="Job Name"
              width="200"
              clipMode="EllipsisWithTooltip"
            />
            <ColumnDirective field="StartDate" />
            <ColumnDirective field="Duration" />
            <ColumnDirective field="ConstraintType" width="180" />
            <ColumnDirective field="ConstraintDate" width={200}/>
            <ColumnDirective field="EndDate" />
            <ColumnDirective field="Predecessor" />
            <ColumnDirective field="Progress" />
            </ColumnsDirective>
            <Inject services={[Edit, Selection, Toolbar, DayMarkers]} />
            </GanttComponent>
        <div style={{ float: 'right', margin: '10px' }}>Source:
          <a href="https://en.wikipedia.org/wiki/Construction" target='_blank'>https://en.wikipedia.org/</a>
        </div>
      </div>

      <div id="action-description">
        <p>
         This sample illustrates how to apply and visualize task constraints in a Gantt Chart. Task constraints define specific scheduling rules that determine when a task can start or finish, based on project requirements or dependencies.
        </p>
      </div>

      <div id="description">
        <p>
	        In Gantt Chart, task constraints define the rules that limit a task's start or end date based on project scheduling needs. The following constraint types are supported:</p>
          <ul>
	          <li><code>As Soon As Possible</code> - Task starts as early as possible. Default for auto-scheduled tasks.</li>
	          <li><code>As Late As Possible</code> - Task finishes as late as possible without delaying dependent tasks.</li>
	          <li><code>Must Start On</code> - Task must start on the specified date.</li>
	          <li><code>Must Finish On</code> - Task must finish on the specified date.</li>
	          <li><code>Start No Earlier Than</code> - Task cannot start before the specified date.</li>
	          <li><code>Start No Later Than</code> - Task must start on or before the specified date.</li>
	          <li><code>Finish No Earlier Than</code> - Task cannot finish before the specified date.</li>
	          <li><code>Finish No Later Than</code> - Task must finish on or before the specified date.</li>
          </ul>
          <br />
          <p>
            You can assign constraints to a task using the <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/taskFieldsModel/#constraintType">taskFields.constraintType</a></code> and <code><a target="_blank" href="https://ej2.syncfusion.com/documentation/api/gantt/taskFieldsModel/#constraintDate">taskFields.constraintDate</a></code> properties.
            Constraints can also be updated interactively through the task edit dialog.
          </p>
        <p><strong>Handling constraint violation popup:</strong></p>
        <p>
          To control or suppress the constraint violation dialog, handle the <code>actionBegin</code> event with <code>requestType</code> as <code>validateTaskViolation</code>. 
          Use <code>args.validateMode</code> to specify how to respond to constraint conflicts. Available properties include:
        </p>
        <ul>
            <li><code>respectMustStartOn</code></li>
            <li><code>respectMustFinishOn</code></li>
            <li><code>respectStartNoLaterThan</code></li>
            <li><code>respectFinishNoLaterThan</code></li>
        </ul>
        <p>
            These options are false by default, which means the violation popup appears. To suppress the popup and cancel conflicting changes silently, set the relevant flag(s) to <strong>true</strong>.
        </p>
        <br />
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/task-constraints">documentation section</a>.</p>
      </div>
    </div>
  );
};

export default Constraints;