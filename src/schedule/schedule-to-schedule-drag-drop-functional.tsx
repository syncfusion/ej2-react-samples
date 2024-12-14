import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Month, ScheduleComponent, ViewsDirective, ViewDirective,
  ResourcesDirective, ResourceDirective, Inject, EventSettingsModel, DragAndDrop, DragEventArgs,
} from '@syncfusion/ej2-react-schedule';
import { updateSampleSection } from '../common/sample-base';
import './schedule-to-schedule-drag-drop.css';

import * as dataSource from './datasource.json';

import { extend } from '@syncfusion/ej2-base';
const ScheduleDragAndDrop = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])

  const dataSource = require('./datasource.json');
  let draggedEventDurations: number;
  let firstSchedule = useRef<ScheduleComponent>(null);
  let secondSchedule = useRef<ScheduleComponent>(null);
  const firstData = extend([], dataSource.resourceData, null, true);
  const eventSettings = { dataSource: firstData }
  const secondData = extend([], dataSource.timelineResourceData, null, true);
  const secondEventSettings = { dataSource: secondData }

  const calculateEventDuration = (args: DragEventArgs) => {
    let startTime: Date = new Date(args.data.StartTime);
    let endTime: Date = new Date(args.data.EndTime);
    let durationInMilliseconds: number = endTime.getTime() - startTime.getTime();
    draggedEventDurations = durationInMilliseconds / (1000 * 60 * 60);
  }

  const firstScheduleResourceData: Record<string, any>[] = [
    { text: 'Steven', id: 1, color: '#7fa900' }
  ];

  const secondScheduleResourceData: Record<string, any>[] = [
    { text: 'John', id: 2, color: '#ffb74d' },
  ];

  const handleDragStop = (args: DragEventArgs) => {
    let sourceSchedule: ScheduleComponent | null;
    let targetSchedule: ScheduleComponent | null;
    if (firstSchedule.current && firstSchedule.current.element.contains(args.event.target as Node)) {
      sourceSchedule = secondSchedule.current;
      targetSchedule = firstSchedule.current;
    } else if (secondSchedule.current && secondSchedule.current.element.contains(args.event.target as Node)) {
      sourceSchedule = firstSchedule.current;
      targetSchedule = secondSchedule.current;
    } else {
      return;
    }
    args.cancel = true;
    const cellData = targetSchedule?.getCellDetails(args.event.target as Element);
    if (cellData && sourceSchedule && targetSchedule) {
      sourceSchedule.deleteEvent(args.data.Id);
      const resourceDetails = targetSchedule.getResourcesByIndex(cellData.groupIndex);
      let droppedEventStartTime: Date;
      let droppedEventEndTime: Date;
      const eventDuration = new Date(args.data.EndTime).getTime() - new Date(args.data.StartTime).getTime();
      if (!args.data.IsAllDay) {
          droppedEventStartTime = new Date(cellData.startTime);
          droppedEventStartTime.setHours(args.data.StartTime.getHours(), args.data.StartTime.getMinutes());
          droppedEventEndTime = new Date(droppedEventStartTime.getTime() + eventDuration);
      } else {
          droppedEventStartTime = cellData.startTime;
          droppedEventEndTime = new Date(droppedEventStartTime.getTime() + eventDuration);
      }
      const eventData = {
        Id: targetSchedule.getEventMaxID(),
        Subject: args.data.Subject,
        StartTime: droppedEventStartTime,
        EndTime: droppedEventEndTime,
        IsAllDay: args.data.IsAllDay,
        Location: args.data.Location,
        Description: args.data.Description,
        StartTimezone: args.data.StartTimezone,
        EndTimezone: args.data.EndTimezone,
        TaskId: resourceDetails.resourceData.id
      };
      targetSchedule.addEvent(eventData);
      const classElement = sourceSchedule.element.querySelector('.e-selected-cell');
      if (classElement) {
        classElement.classList.remove('e-selected-cell');
      }
    }
  }

  return (
    <div className='schedule-control-section'>
      <div className="col-lg-12 control-section">
        <div className="content-wrapper multiple-schedulers" >
          <div className="schedule-container">
            <ScheduleComponent id="first-schedule" ref={firstSchedule} width='100%' height='550px' currentView='Month' selectedDate={new Date(2023, 0, 1)}
              eventDragArea='.content-wrapper' group={{ resources: ['Employees'] }} dragStart={calculateEventDuration} dragStop={handleDragStop} eventSettings={eventSettings}>
              <ResourcesDirective>
                <ResourceDirective field='TaskId' title='Employee' name='Employees' dataSource={firstScheduleResourceData} textField='text' idField='id' colorField='color' />
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Month, DragAndDrop]} />
            </ScheduleComponent>
            <ScheduleComponent  id="second-schedule" ref={secondSchedule} group={{ resources: ['Employees'] }} width='100%' height='550px' currentView='Month' selectedDate={new Date(2023, 0, 1)} eventDragArea='.content-wrapper'
              dragStop={handleDragStop} eventSettings={secondEventSettings}>
              <ResourcesDirective>
                <ResourceDirective field='TaskId' title='Employee' name='Employees' dataSource={secondScheduleResourceData} textField='text' idField='id' colorField='color' />
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Month, DragAndDrop]} />
            </ScheduleComponent>
          </div>

        </div>
      </div>
      <div id="action-description">
        <p>
          This example illustrates how to drag and drop events among multiple Scheduler. You can drag
          events from one Scheduler to another.
        </p>
      </div>
      <div id="description">
        <p>
          In this example, <code>eventDragArea</code> is used to drag a range of events from one Scheduler to another. The
          <code>dragStop</code> event of the Scheduler is triggered when an item is dropped from one Scheduler onto
          another. Within the <code>dragStop</code> event, the <code>addEvent</code> method is used to add the dropped event to the
          target Scheduler, and the <code>deleteEvent</code> method is used to remove the dragged event from the source
          Scheduler.
        </p>
      </div>
    </div>
  );
}
export default ScheduleDragAndDrop;