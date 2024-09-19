import * as ReactDOM from "react-dom";
import * as React from "react";
import { TimelineViews, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective,
  Inject, DragAndDrop, DragEventArgs, Resize } from "@syncfusion/ej2-react-schedule";

import { GridComponent, ColumnsDirective, ColumnDirective, RowDD, Edit} from "@syncfusion/ej2-react-grids";
import "./schedule-to-grid.css";
import { SampleBase } from "../common/sample-base";
import { extend } from "@syncfusion/ej2-base";

import * as dataSource from './datasource.json';

class ScheduleToGrid extends SampleBase<{}, {}> {
  private scheduleRef!: ScheduleComponent | null;
  private gridObj!: GridComponent | null;

  dataSource = require('./datasource.json');

  firstData = extend([], this.dataSource.resourceData, null, true);
  eventSettings = { dataSource: this.firstData };
  resourceData = [
    { text: "Nancy", id: 1, color: "#df5286" },
    { text: "Steven", id: 2, color: "#7fa900" },
    { text: "Robert", id: 3, color: "#ea7a57" },
    { text: "Smith", id: 4, color: "#5978ee" },
    { text: "Michael", id: 5, color: "#00bdae" },
    { text: "Root", id: 6, color: "#f57b42" },
    { text: "John", id: 7, color: "#1aaa55" },
    { text: "Stellah", id: 8, color: "#ffb74d" },
    { text: "Chirish", id: 9, color: "#7460ee" },
    { text: "Megan", id: 10, color: "#c0ca33" },
  ];

  gridData = [
    { Task: "Test report validation", Duration: "3 Hours" },
    { Task: "Timeline estimation", Duration: "4 Hours" },
    { Task: "Workflow Analysis", Duration: "2 Hours" },
    { Task: "Quality Analysis", Duration: "5 Hours" },
    { Task: "Cross-browser testing", Duration: "1 Hour" },
    { Task: "Resolution-based testing", Duration: "3 Hours" },
    { Task: "Project Preview", Duration: "6 Hours" },
    { Task: "Developers Meeting", Duration: "2 Hours" },
    { Task: "Test case correction", Duration: "7 Hours" },
    { Task: "Debugging", Duration: "4 Hours" },
    { Task: "Exception handling", Duration: "5 Hours" },
    { Task: "Bug fixing", Duration: "1 Hour" },
    { Task: "Bug Automation", Duration: "3 Hours" },
    { Task: "Bug fixing", Duration: "6 Hours" },
  ];

  group = { enableCompactView: false, resources: ["Names"] };
  editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };

  handleDragStop = (args: DragEventArgs) => {
    if ( this.scheduleRef && this.gridObj && this.gridObj.element.contains(args.event.target as Node)) {
      this.scheduleRef.deleteEvent(args.data.Id);
      const startTime = new Date(args.data.StartTime);
      const  endTime = new Date(args.data.EndTime);
      const formattedDuration = this.calculateEventDuration(startTime, endTime);
      const gridRecord = { Task: args.data.Subject, Duration: formattedDuration };
      this.gridObj.addRecord(gridRecord);
    }
  };

  calculateEventDuration = (startTime: Date, endTime: Date) => {
    var durationInMilliseconds = endTime.getTime() - startTime.getTime();
    var durationInHours = durationInMilliseconds / (1000 * 60 * 60);
    return durationInHours + " Hours";
  };

  rowDrag = (args: any) => {
    args.cancel = true;
  };

  rowDrop = (args: any) => {
    args.cancel = true;
    const scheduleObj = this.scheduleRef;
    if ( scheduleObj && this.gridObj && scheduleObj.element.contains(args.target)) {
      const cellData = scheduleObj.getCellDetails(args.target);
      if (typeof cellData.groupIndex === "number") {
        const resourceDetails = scheduleObj.getResourcesByIndex( cellData.groupIndex);
        const durationStr = args.data[0].Duration;
        const durationHours = parseInt(durationStr.split(" ")[0], 10);
        const startTime = new Date(cellData.startTime);
        const endTime = new Date(
          startTime.getTime() + durationHours * 60 * 60 * 1000
        );
        const eventData = {
          Id: scheduleObj.getEventMaxID(),
          Subject: args.data[0].Task,
          StartTime: startTime,
          EndTime: endTime,
          IsAllDay: cellData.isAllDay,
          TaskId: resourceDetails.resourceData.id,
        };
        scheduleObj.addEvent(eventData);
        this.gridData = this.gridData.filter( (item) => item.Task !== args.data[0].Task);
        this.gridObj.dataSource = this.gridData;
        this.gridObj.dataBind();
      }
    }
  };

  dataBound = () => {
    if (this.scheduleRef) {
      var selectedCells = this.scheduleRef.element.querySelectorAll(".e-selected-cell");
      for (var i = 0; i < selectedCells.length; i++) {
        selectedCells[i].classList.remove("e-selected-cell");
      }
    }
  };

  onDataBound = () => {
    let scheduleObj = this.scheduleRef as ScheduleComponent;
    let resourceDataCounter = 0;
    const resourceCells = scheduleObj.element.querySelectorAll(".e-resource-cells .e-resource-text");
    const workcells = scheduleObj.element.querySelector(".e-work-cells");
    if (!workcells) return;
    const timestamp = Number(workcells.getAttribute("data-date"));
    const startDate = new Date(timestamp);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);
    const events = scheduleObj.getEvents(startDate, endDate, true);
    const eventsMap = new Map();
    for (var i = 0; i < events.length; i++) {
      var taskId = events[i].TaskId;
      if (!eventsMap.has(taskId)) {
        eventsMap.set(taskId, []);
      }
      eventsMap.get(taskId).push(events[i]);
    }

    for (let i = 0; i < resourceCells.length; i++) {
      const cell: HTMLElement = resourceCells[i] as HTMLElement;
      if ( Array.isArray(scheduleObj.resourceCollection[0].dataSource) &&
        resourceDataCounter < scheduleObj.resourceCollection[0].dataSource.length) {
        resourceDataCounter++;
      }
      const resourceEvents = eventsMap.get(resourceDataCounter) || [];
      const currentText = cell.innerText;
      const eventCount = resourceEvents.length;
      const resourceName = currentText.split('(')[0].trim();
      cell.innerText = resourceName + ' (' + eventCount + ')';
    }
  };

  render() {
    return (
      <div className='schedule-control-section'>
        <div className="col-lg-12 control-section">
            <div className="content-wrapper grid-to-schedule">
              <div className="schedule-container">
                <div className="schedule-content">
                  <h5 style={{ textAlign: 'center', margin: '0', position: 'relative', bottom: '10px' }}> Task Management </h5>
                  <ScheduleComponent id="Schedule" ref={(schedule: any) => (this.scheduleRef = schedule as ScheduleComponent)} width="100%" height="100%" currentView="TimelineDay" selectedDate={new Date(2023, 0, 4)} group={this.group}
                    rowAutoHeight={true}
                    eventDragArea=".content-wrapper" eventSettings={this.eventSettings} cssClass="grid-schedule" dragStop={this.handleDragStop} dataBound={this.onDataBound}>
                    <ViewsDirective>
                      <ViewDirective option="TimelineDay" />
                    </ViewsDirective>
                    <ResourcesDirective>
                      <ResourceDirective field="TaskId" title="Name" name="Names" allowMultiple={true} dataSource={this.resourceData} textField="text" idField="id" colorField="color"></ResourceDirective>
                    </ResourcesDirective>
                    <Inject services={[TimelineViews, DragAndDrop, Resize]} />
                  </ScheduleComponent>
                </div>
                <div className="grid-content">
                  <h5 style={{ textAlign: 'center', margin: '0', position: 'relative', bottom: '10px' }}> Unplanned Tasks </h5>
                  <GridComponent dataSource={this.gridData} cssClass="drag-grid" width="280px" height="100%" allowRowDragAndDrop={true} rowDrop={this.rowDrop} rowDrag={this.rowDrag} editSettings={this.editOptions} rowDropSettings={{ targetID: "Schedule" }} ref={(grid) => (this.gridObj = grid)}>
                    <ColumnsDirective>
                      <ColumnDirective field="Task" headerText="Task" width={50} />
                      <ColumnDirective field="Duration" headerText="Duration" width={30} />
                    </ColumnsDirective>
                    <Inject services={[RowDD, Edit]} />
                  </GridComponent>
                </div>
              </div>
            </div>
        </div>
        <div id="action-description">
          <p>This example illustrates how to drag and drop events between the DataGrid and the Scheduler.</p>
        </div>
        <div id="description">
          <p>In this example, the DataGrid's <code>allowRowDragAndDrop</code> and <code>rowDropSettings</code> are used to drag
          and drop items from the DataGrid to the Scheduler. The <code>rowDrop</code> event of the DataGrid is triggered when an item
          is dropped to the Scheduler. Within the <code>rowDrop</code> event, the <code>addEvent</code> method
          is used to add the dropped item to the target Scheduler, and the <code>deleteRecord</code> method is used to remove
          the dragged item from the DataGrid.<br></br>

          For Scheduler to DataGrid, <code>eventDragArea</code> is used to drag a range of events. The <code>dragStop</code> event of the Scheduler is triggered when an item is dropped from the Scheduler to the
          DataGrid. Within the <code>dragStop</code> event, the DataGrid's <code>addRecord</code> method is used to add the
          dropped event to the target DataGrid, and the <code>deleteEvent</code> method is used to remove the dragged event from the
          Scheduler.</p>
        </div>
      </div>
    );
  }
}

export default ScheduleToGrid;
