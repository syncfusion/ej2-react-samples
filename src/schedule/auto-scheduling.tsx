import * as ReactDOM from "react-dom";
import * as React from "react";
import "./auto-scheduling.css";
import {
  TimelineViews, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective,
  Inject, DragAndDrop, DragEventArgs, Resize, ResizeEventArgs
} from "@syncfusion/ej2-react-schedule";
import { GridComponent, ColumnsDirective, ColumnDirective, RowDD, Edit } from "@syncfusion/ej2-react-grids";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { SampleBase } from "../common/sample-base";
import { extend } from "@syncfusion/ej2-base";


interface Resource {
  text: string;
  id: number;
  color: string;
  group: string;
  skills: string[];
}

interface UnplannedAppointment {
  Task: string;
  Duration: string;
  RequiredSkill: string;
}

export class AutoScheduling extends SampleBase<{}, {}> {
  private scheduleRef!: ScheduleComponent | null;
  private gridObj!: GridComponent | null;
  private selectedDate: Date = new Date();
  resourceData: Resource[] = [
    { text: "Smith", id: 1, color: "#df5286", group: "Doctor", skills: ["Cardiology", "General"] },
    { text: "Lee", id: 2, color: "#7fa900", group: "Doctor", skills: ["Pediatrics", "General"] },
    { text: "Patel", id: 3, color: "#ea7a57", group: "Doctor", skills: ["Surgery", "General"] },
    { text: "Amy", id: 4, color: "#5978ee", group: "Nurse", skills: ["ICU", "Ward"] },
    { text: "John", id: 5, color: "#00bdae", group: "Nurse", skills: ["ER", "Ward"] },
    { text: "Sara", id: 6, color: "#f57b42", group: "Nurse", skills: ["ICU", "ER"] },
  ];

  gridData: UnplannedAppointment[] = [
    { Task: "Cardiology Consultation", Duration: "2 Hours", RequiredSkill: "Cardiology" },
    { Task: "Pediatric Health Assessment", Duration: "1 Hour", RequiredSkill: "Pediatrics" },
    { Task: "Pre-Surgical Evaluation", Duration: "3 Hours", RequiredSkill: "Surgery" },
    { Task: "Critical Care Monitoring", Duration: "2 Hours", RequiredSkill: "ICU" },
    { Task: "Emergency Patient Intake", Duration: "1 Hour", RequiredSkill: "ER" },
    { Task: "Inpatient Care Management", Duration: "2 Hours", RequiredSkill: "Ward" },
    { Task: "General Medical Examination", Duration: "1 Hour", RequiredSkill: "General" },
    { Task: "Emergency Case Assessment", Duration: "1 Hour", RequiredSkill: "ER" }
  ];

  getInitialEvents = (): any[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return [
        {
            Id: 1,
            Subject: 'Cardiac Checkup - Mr. Johnson',
            StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
            EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
            IsAllDay: false,
            StaffId: 1,
            RequiredSkill: 'Cardiology',
        },
        {
            Id: 2,
            Subject: 'Consultation - ECG Review',
            StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
            EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
            IsAllDay: false,
            StaffId: 1,
            RequiredSkill: 'Cardiology',
        },
        {
            Id: 3,
            Subject: 'Child Wellness Exam - Emma',
            StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
            EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
            IsAllDay: false,
            StaffId: 2,
            RequiredSkill: 'Pediatrics',
        },
        {
            Id: 4,
            Subject: 'Vaccination Clinic',
            StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
            EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
            IsAllDay: false,
            StaffId: 2,
            RequiredSkill: 'General',
        },
        {
            Id: 5,
            Subject: 'Pre-Op Assessment',
            StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
            EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
            IsAllDay: false,
            StaffId: 3,
            RequiredSkill: 'Surgery',
        },
        {
            Id: 6,
            Subject: 'Surgical Consultation - Mrs. Smith',
            StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
            EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30),
            IsAllDay: false,
            StaffId: 3,
            RequiredSkill: 'Surgery',
        },
        {
            Id: 7,
            Subject: 'ICU Patient Monitoring',
            StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
            EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
            IsAllDay: false,
            StaffId: 4,
            RequiredSkill: 'ICU',
        },
        {
            Id: 8,
            Subject: 'Vitals Check - ICU Ward',
            StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
            EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
            IsAllDay: false,
            StaffId: 4,
            RequiredSkill: 'Ward',
        },
        {
            Id: 9,
            Subject: 'ER Triage - Patient Intake',
            StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
            EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
            IsAllDay: false,
            StaffId: 5,
            RequiredSkill: 'ER',
        },
        {
            Id: 10,
            Subject: 'Emergency Response Team',
            StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30),
            EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0),
            IsAllDay: false,
            StaffId: 5,
            RequiredSkill: 'ER',
        },
        {
            Id: 11,
            Subject: 'ICU Support & Monitoring',
            StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
            EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
            IsAllDay: false,
            StaffId: 6,
            RequiredSkill: 'ICU',
        },
        {
            Id: 12,
            Subject: 'ER Support - Critical Care',
            StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0),
            EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 30),
            IsAllDay: false,
            StaffId: 6,
            RequiredSkill: 'ER',
        },
    ];
  };

  eventSettings = { dataSource: this.getInitialEvents() };
  group = { enableCompactView: false, resources: ["Staff"] };
  editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };

  private resourceWorkload: Map<number, number> = new Map();
  private draggedEventData: any = null;
  private maxDailyWorkload = 8;
  private scheduledAppointments: Set<string> = new Set();

  rowDrag = (args: any) => {
    args.cancel = true;
  };

  isTimeSlotAvailableForResource = (resourceId: number, startTime: Date, endTime: Date): boolean => {
    if (!this.scheduleRef) {
      return false;
    }

    const scheduleObj = this.scheduleRef;
    const allEvents = scheduleObj.getEvents() || [];
    const proposedDay = new Date(startTime);
    proposedDay.setHours(0, 0, 0, 0);

    return !allEvents.some((event: any) => {
      if (event.StaffId !== resourceId) {
        return false;
      }

      const eventDay = new Date(event.StartTime);
      eventDay.setHours(0, 0, 0, 0);
      if (eventDay.getTime() !== proposedDay.getTime()) {
        return false;
      }

      const eventStart = new Date(event.StartTime).getTime();
      const eventEnd = new Date(event.EndTime).getTime();
      return startTime.getTime() < eventEnd && endTime.getTime() > eventStart;
    });
  };

  rowDrop = (args: any) => {
    const scheduleObj = this.scheduleRef;
    if (scheduleObj && this.gridObj && scheduleObj.element.contains(args.target)) {
      const cellData = scheduleObj.getCellDetails(args.target);
      if (cellData && typeof cellData.groupIndex === "number") {
        const resourceDetails = scheduleObj.getResourcesByIndex(cellData.groupIndex);
        const appointment = args.data[0];
        const durationStr = appointment.Duration;
        const durationHours = parseInt(durationStr.split(" ")[0], 10);

        const resource = this.resourceData.find((r) => r.id === resourceDetails.resourceData.id);
        if (!resource || !resource.skills.includes(appointment.RequiredSkill)) {
          return;
        }

        const workload = this.getResourceWorkloadForDate(resource.id, cellData.startTime);
        if (workload + durationHours > this.maxDailyWorkload) {
          return;
        }

        const startTime = new Date(cellData.startTime);
        const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);

        if (!this.isTimeSlotAvailableForResource(resourceDetails.resourceData.id, startTime, endTime)) {
          return;
        }

        const allEvents = scheduleObj.getEvents();
        let maxId = 0;
        if (allEvents && allEvents.length > 0) {
          maxId = Math.max(...allEvents.map((e: any) => typeof e.Id === 'number' ? e.Id : 0));
        }

        const eventData = {
          Id: maxId + 1,
          Subject: appointment.Task,
          StartTime: startTime,
          EndTime: endTime,
          IsAllDay: cellData.isAllDay,
          StaffId: resourceDetails.resourceData.id,
          RequiredSkill: appointment.RequiredSkill,
        };
        scheduleObj.addEvent(eventData);

        const appointmentKey = `${appointment.Task}|${appointment.RequiredSkill}`;
        this.scheduledAppointments.add(appointmentKey);

        this.gridData = this.gridData.filter((item) => !(
          item.Task === appointment.Task &&
          item.RequiredSkill === appointment.RequiredSkill
        ));

        if (this.gridObj) {
          this.gridObj.dataSource = this.gridData;
          this.gridObj.refresh();
        }
      }
    }
  };

  handleEventDragStart = (args: DragEventArgs) => {
    this.draggedEventData = args.data;
  };

  handleEventDragStop = (args: DragEventArgs) => {
    if (this.draggedEventData && args.data) {
      const hasResourceChanged = this.draggedEventData.StaffId !== args.data.StaffId;
      const hasTimeChanged =
        new Date(this.draggedEventData.StartTime).getTime() !== new Date(args.data.StartTime).getTime();

      if (hasResourceChanged || hasTimeChanged) {
        const targetResource = this.resourceData.find((r) => r.id === args.data.StaffId);
        const eventSkill = this.draggedEventData.RequiredSkill || this.getEventSkill(this.draggedEventData);

        const startTime = new Date(args.data.StartTime);
        const endTime = new Date(args.data.EndTime);
        const durationMs = endTime.getTime() - startTime.getTime();
        const durationHours = durationMs / (1000 * 60 * 60);

        if (targetResource && !targetResource.skills.includes(eventSkill)) {
          args.data.StaffId = this.draggedEventData.StaffId;
          args.data.StartTime = new Date(this.draggedEventData.StartTime);
          args.data.EndTime = new Date(this.draggedEventData.EndTime);

          if (this.scheduleRef) {
            this.scheduleRef.saveEvent(args.data);
          }
        } else {
          
          const currentWorkload = this.getResourceWorkloadForDate(
            args.data.StaffId,
            startTime,
            args.data.Id
          );

          if (currentWorkload + durationHours > this.maxDailyWorkload) {
            args.data.StaffId = this.draggedEventData.StaffId;
            args.data.StartTime = new Date(this.draggedEventData.StartTime);
            args.data.EndTime = new Date(this.draggedEventData.EndTime);

            if (this.scheduleRef) {
              this.scheduleRef.saveEvent(args.data);
            }
          } else {
            if (eventSkill) {
              args.data.RequiredSkill = eventSkill;
            }
          }
        }
      }
    }
    this.draggedEventData = null;
  };

  getEventSkill = (eventData: any): string => {
    if (eventData.RequiredSkill) return eventData.RequiredSkill;

    const subject = eventData.Subject || '';
    for (const resource of this.resourceData) {
      for (const skill of resource.skills) {
        if (subject.includes(skill)) {
          return skill;
        }
      }
    }
    return 'General';
  };

  getResourceWorkloadForDate = (resourceId: number, date: Date, excludeEventId?: number | string): number => {
    if (!this.scheduleRef) return 0;

    const scheduleObj = this.scheduleRef;
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const allEvents = scheduleObj.getEvents() || [];
    let totalHours = 0;

    for (const event of allEvents) {
      const eventDate = new Date(event.StartTime);
      eventDate.setHours(0, 0, 0, 0);

      const isOnSameDay = eventDate.getTime() === dayStart.getTime();
      const isForResource = event.StaffId === resourceId;
      const isNotExcluded = !excludeEventId || event.Id !== excludeEventId;

      if (isOnSameDay && isForResource && isNotExcluded) {
        const startTime = new Date(event.StartTime);
        const endTime = new Date(event.EndTime);
        const durationMs = endTime.getTime() - startTime.getTime();
        const hours = durationMs / (1000 * 60 * 60);
        totalHours += hours;
      }
    }

    return totalHours;
  };

  findAvailableTimeSlotForResource = (
    resourceId: number,
    durationHours: number,
    date: Date,
    tempScheduledEvents?: any[]
  ): { startTime: Date; endTime: Date } | null => {
    if (!this.scheduleRef) {
      return null;
    }

    const scheduleObj = this.scheduleRef;
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const workingStart = new Date(dayStart);
    workingStart.setHours(9, 0, 0, 0);

    const workingEnd = new Date(dayStart);
    workingEnd.setHours(23, 0, 0, 0);

    const allEvents = scheduleObj.getEvents(dayStart, dayEnd) || [];
    let resourceEvents = allEvents
      .filter((event: any) => event.StaffId === resourceId)
      .sort((a: any, b: any) =>
        new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime()
      );

    if (tempScheduledEvents && tempScheduledEvents.length > 0) {
      const tempResourceEvents = tempScheduledEvents
        .filter((event: any) => event.StaffId === resourceId)
        .sort((a: any, b: any) =>
          new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime()
        );
      resourceEvents = [...resourceEvents, ...tempResourceEvents].sort((a: any, b: any) =>
        new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime()
      );
    }

    const durationMs = durationHours * 60 * 60 * 1000;

    if (resourceEvents.length === 0) {
      if (workingStart.getTime() + durationMs <= workingEnd.getTime()) {
        return {
          startTime: new Date(workingStart),
          endTime: new Date(workingStart.getTime() + durationMs),
        };
      }
    } else {
      const firstEventStart = new Date(resourceEvents[0].StartTime).getTime();
      if (workingStart.getTime() + durationMs <= firstEventStart) {
        return {
          startTime: new Date(workingStart),
          endTime: new Date(workingStart.getTime() + durationMs),
        };
      }

      for (let i = 0; i < resourceEvents.length - 1; i++) {
        const currentEventEnd = new Date(resourceEvents[i].EndTime).getTime();
        const nextEventStart = new Date(resourceEvents[i + 1].StartTime).getTime();

        if (nextEventStart - currentEventEnd >= durationMs) {
          return {
            startTime: new Date(currentEventEnd),
            endTime: new Date(currentEventEnd + durationMs),
          };
        }
      }

      const lastEventEnd = new Date(resourceEvents[resourceEvents.length - 1].EndTime).getTime();
      if (lastEventEnd + durationMs <= workingEnd.getTime()) {
        return {
          startTime: new Date(lastEventEnd),
          endTime: new Date(lastEventEnd + durationMs),
        };
      }
    }

    return null;
  };

  handleAutoScheduling = () => {
    if (!this.scheduleRef || !this.gridObj) return;
    const scheduleObj = this.scheduleRef;
    const appointmentsToSchedule: UnplannedAppointment[] = this.gridData.filter((appt) => {
      const appointmentKey = `${appt.Task}|${appt.RequiredSkill}`;
      return !this.scheduledAppointments.has(appointmentKey);
    });
    const successfullyScheduled: string[] = [];

    const tempScheduledEvents: any[] = [];

    this.resourceWorkload.clear();
    const scheduleDate = this.scheduleRef.selectedDate || new Date();
    const dayStart = new Date(scheduleDate);
    dayStart.setHours(0, 0, 0, 0);

    for (const resource of this.resourceData) {
      this.resourceWorkload.set(resource.id, this.getResourceWorkloadForDate(resource.id, dayStart));
    }

    const allExistingEvents = scheduleObj.getEvents() || [];
    let maxEventId = 0;
    if (allExistingEvents.length > 0) {
      maxEventId = Math.max(...allExistingEvents.map((e: any) => typeof e.Id === 'number' ? e.Id : 0));
    }
    let nextEventId = maxEventId + 1;
    for (const appt of appointmentsToSchedule) {
      const matchingResources = this.resourceData.filter((r) =>
        r.skills.includes(appt.RequiredSkill)
      );

      if (matchingResources.length === 0) continue;

      const durationHours = parseInt(appt.Duration.split(" ")[0], 10);
      let bestResource: Resource | null = null;
      let bestSlot: { startTime: Date; endTime: Date } | null = null;
      let bestWorkload = Infinity;

      for (const resource of matchingResources) {
        const currentWorkload = this.resourceWorkload.get(resource.id) || 0;

        if (currentWorkload + durationHours > this.maxDailyWorkload) {
          continue;
        }

        const slot = this.findAvailableTimeSlotForResource(resource.id, durationHours, dayStart, tempScheduledEvents);
        if (!slot) {
          continue;
        }

        if (currentWorkload < bestWorkload) {
          bestResource = resource;
          bestSlot = slot;
          bestWorkload = currentWorkload;
        }
      }

      if (!bestResource || !bestSlot) {
        continue;
      }

      const eventData = {
        Id: nextEventId,
        Subject: appt.Task,
        StartTime: bestSlot.startTime,
        EndTime: bestSlot.endTime,
        IsAllDay: false,
        StaffId: bestResource.id,
        RequiredSkill: appt.RequiredSkill,
      };

      scheduleObj.addEvent(eventData);

      tempScheduledEvents.push(eventData);

      const appointmentKey = `${appt.Task}|${appt.RequiredSkill}`;
      this.scheduledAppointments.add(appointmentKey);

      this.resourceWorkload.set(bestResource.id, bestWorkload + durationHours);
      successfullyScheduled.push(appt.Task);
      nextEventId++;
    }

    this.gridData = this.gridData.filter((item) => {
      const appointmentKey = `${item.Task}|${item.RequiredSkill}`;
      return !this.scheduledAppointments.has(appointmentKey);
    });

    this.gridObj.dataSource = this.gridData;
    this.gridObj.dataBind();
  };

  onDataBound = () => {
    let scheduleObj = this.scheduleRef as ScheduleComponent;
    const resourceCells = scheduleObj.element.querySelectorAll(".e-resource-cells .e-resource-text");
    const workcells = scheduleObj.element.querySelector(".e-work-cells");
    if (!workcells) return;

    const timestamp = Number(workcells.getAttribute("data-date"));
    const startDate = new Date(timestamp);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    const events = scheduleObj.getEvents(startDate, endDate, true);
    const eventsMap = new Map<number, any[]>();

    for (let i = 0; i < events.length; i++) {
      const staffId = events[i].StaffId;
      if (!eventsMap.has(staffId)) {
        eventsMap.set(staffId, []);
      }
      eventsMap.get(staffId)!.push(events[i]);
    }

    for (let i = 0; i < resourceCells.length; i++) {
      const cell: HTMLElement = resourceCells[i] as HTMLElement;
      const resourceText = cell.getAttribute("data-resource-id");
      const resourceId = resourceText ? parseInt(resourceText, 10) : i + 1;

      const resourceEvents = eventsMap.get(resourceId) || [];
      const currentText = cell.innerText;
      const eventCount = resourceEvents.length;

      const resource = this.resourceData.find((r) => r.id === resourceId);
      if (!resource) continue;

      const workload = this.getResourceWorkloadForDate(resourceId, startDate);

      cell.innerHTML = '';

      const container = document.createElement('div');
      container.className = 'resource-header-container';

      const avatar = document.createElement('div');
      avatar.className = 'resource-header-avatar';
      avatar.style.backgroundColor = resource.color;
      avatar.textContent = resource.text.charAt(0).toUpperCase();

      const infoDiv = document.createElement('div');
      infoDiv.className = 'resource-header-info';

      const workloadDiv = document.createElement('div');
      workloadDiv.className = 'resource-header-workload';
      workloadDiv.textContent = `${workload}/8h`;

      const nameDiv = document.createElement('div');
      nameDiv.className = 'resource-header-name';
      nameDiv.textContent = resource.text;
      infoDiv.appendChild(nameDiv);

      if (resource.skills.length > 0) {
        const skillsDiv = document.createElement('div');
        skillsDiv.className = 'resource-header-skills';

        resource.skills.forEach((skill) => {
          const skillBadge = document.createElement('span');
          skillBadge.className = 'skill-badge';
          skillBadge.textContent = skill;
          skillsDiv.appendChild(skillBadge);
        });

        infoDiv.appendChild(skillsDiv);
      }


      container.appendChild(avatar);
      container.appendChild(infoDiv);
      container.appendChild(workloadDiv);
      cell.appendChild(container);
    }
  };

  private onActionBegin = (args: any): void => {

    if (args.requestType === 'toolbarItemRendering') {

        const autoScheduleItem = {
            align: 'Right',
            template: () => (
                <ButtonComponent
                    cssClass='e-primary'
                    onClick={this.handleAutoScheduling}
                >
                    Auto Scheduling
                </ButtonComponent>
            )
        };

        args.items.push(autoScheduleItem);
        return;
    }

    if (args.requestType !== 'eventChange') {
        return;
    }

    const eventData = Array.isArray(args.data) ? args.data[0] : args.data;

    const startTime = new Date(eventData.StartTime);
    const endTime = new Date(eventData.EndTime);

    const durationHours =
        (endTime.getTime() - startTime.getTime()) /
        (1000 * 60 * 60);

    const workload = this.getResourceWorkloadForDate(
        eventData.StaffId,
        startTime,
        eventData.Id
    );

    if (workload + durationHours > this.maxDailyWorkload) {
     args.cancel = true;
    }
  };

  private onCellClick = (args: any): void => {  
    args.cancel = true; 
  };

  private onPopupOpen = (args: any): void => {
    if (args.type === 'Editor') {
      args.cancel = true;
    }
  };

  private taskTemplate = (props: any) => {
        return (
            <div className="task-template">
                <div className="task-name">
                    {props.Task}
                </div>
                <div className="task-skill">
                    {props.RequiredSkill}
                </div>
            </div>
        );
  };

  render() {
    return (
      <div className='schedule-control-section'>
        <div className="col-lg-12 control-section">
          <div className="control-wrapper auto-scheduling">
            <div className="schedule-container">
              <div className="schedule-content">
                <h5 style={{ textAlign: 'center', margin: '0', position: 'relative', bottom: '10px' }}>Automated Appointment Assignment</h5>
                <ScheduleComponent
                  id="Schedule"
                  ref={(schedule: any) => (this.scheduleRef = schedule as ScheduleComponent)}
                  width="100%"
                  height="100%"
                  currentView="TimelineDay"
                  selectedDate={this.selectedDate}
                  group={this.group}
                  allowOverlap={false}
                  eventSettings={{ dataSource: this.eventSettings.dataSource, fields: { subject: { name: 'Subject' }, startTime: { name: 'StartTime' }, endTime: { name: 'EndTime' }, resourceId: { name: 'StaffId' } } }}
                  cssClass="grid-auto-scheduling"
                  dragStart={this.handleEventDragStart}
                  dragStop={this.handleEventDragStop}
                  dataBound={this.onDataBound}
                  actionBegin={this.onActionBegin}
                  cellClick={this.onCellClick}
                  popupOpen={this.onPopupOpen}
                >
                  <ViewsDirective>
                    <ViewDirective option="TimelineDay" />
                  </ViewsDirective>
                  <ResourcesDirective>
                    <ResourceDirective
                      field="StaffId"
                      title="Staff"
                      name="Staff"
                      allowMultiple={false}
                      dataSource={this.resourceData}
                      textField="text"
                      idField="id"
                      colorField="color"
                      groupIDField="group"
                    />
                  </ResourcesDirective>
                  <Inject services={[TimelineViews, DragAndDrop]} />
                </ScheduleComponent>
              </div>
              <div className="grid-content">
                <h5 style={{ textAlign: 'center', margin: '0', position: 'relative', bottom: '10px' }}>Unplanned Appointments</h5>
                <GridComponent
                  dataSource={this.gridData}
                  cssClass="drag-grid-data"
                  width="300px"
                  height="100%"
                  allowRowDragAndDrop={true}
                  rowDrop={this.rowDrop}
                  rowDrag={this.rowDrag}
                  editSettings={this.editOptions}
                  rowDropSettings={{ targetID: "Schedule" }}
                  ref={(grid: GridComponent) => (this.gridObj = grid)}
                >
                  <ColumnsDirective>
                    <ColumnDirective field="Task" headerText="Task" width={200} template={this.taskTemplate}/>
                    <ColumnDirective field="Duration" headerText="Duration" width={110} />
                  </ColumnsDirective>
                  <Inject services={[RowDD, Edit]} />
                </GridComponent>
              </div>
            </div>
          </div>
        </div>
        <div id='action-description'>
            <p>
              This demo showcases Auto Scheduling in the Scheduler with skill-based resource allocation, workload balancing, and automated appointment assignment. Automatically assign unplanned appointments to the most suitable doctor or nurse based on required skills, availability, and optimized time slot matching.
            </p>
        </div>

        <div id='description'>
            <p>
                Auto Scheduling in the Scheduler helps healthcare teams efficiently assign patient appointments to qualified staff members. Unplanned appointments are listed in the grid with their required skills, while the Scheduler displays the current workload and availability of each resource.
            </p>
            
            <p>
                <strong>Skill-Based Assignment</strong><br />
                Appointments are automatically matched to doctors and nurses who possess the required skill. The scheduler ensures that only qualified resources can be assigned to specialized tasks such as Cardiology, Pediatrics, Surgery, ICU, ER, and Ward care.
            </p>
            
            <p>
                <strong>Workload Balancing</strong><br />
                The scheduling algorithm distributes appointments across available resources while respecting the configured daily workload limit. This helps prevent overbooking and promotes balanced utilization of staff members.
            </p>
            
            <p>
                <strong>Automatic Scheduling</strong><br />
                Clicking the <b>Auto Scheduling</b> button analyzes resource skills, workload capacity, and available schedule gaps to find the most appropriate time slot for each unplanned appointment.
            </p>
            
            <p>
                <strong>Interactive Scheduling</strong><br />
                Appointments can also be manually assigned by dragging records from the grid into the Scheduler. Skill matching, workload limits, and schedule conflict validation are automatically enforced during drag-and-drop operations.
            </p>
            <p>Looking for the full React Scheduler component overview, features, pricing, and documentation? Visit our <a href="https://www.syncfusion.com/scheduler-sdk/react-scheduler" target="_blank">React Scheduler</a> page.</p>
        </div>
      </div>
    );
  }
}
