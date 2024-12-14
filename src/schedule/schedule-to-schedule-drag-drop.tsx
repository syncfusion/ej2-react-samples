import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Month, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop, DragEventArgs
} from '@syncfusion/ej2-react-schedule';
import './schedule-to-schedule-drag-drop.css';

import { SampleBase } from '../common/sample-base';
import { extend } from '@syncfusion/ej2-base';

import * as dataSource from './datasource.json';

class ScheduleDragAndDrop extends SampleBase<{}, {}> {
  private firstSchedule!: ScheduleComponent | null;
  private secondSchedule!: ScheduleComponent | null;
  dataSource = require('./datasource.json');
  firstData = extend([], this.dataSource.resourceData, null, true);
  secondData = extend([], this.dataSource.timelineResourceData, null, true);
  eventSettings = { dataSource: this.firstData }
  secondEventSettings = { dataSource: this.secondData }
  draggedEventDurations = 0;

  calculateEventDuration = (args: DragEventArgs) => { 
    let startTime = new Date(args.data.StartTime);
    let endTime = new Date(args.data.EndTime);
    let durationInMilliseconds = endTime.getTime() - startTime.getTime();
    this.draggedEventDurations = durationInMilliseconds / (1000 * 60 * 60);
  }

  private firstScheduleResourceData: Record<string, any>[] = [
    { text: 'Steven', id: 1, color: '#7fa900' }
  ];

  private secondScheduleResourceData: Record<string, any>[] = [
    { text: 'John', id: 2, color: '#ffb74d' },
  ];

  handleDragStop = (args: DragEventArgs) => {
    let sourceSchedule;
    let targetSchedule;
    if (this.firstSchedule && this.firstSchedule.element.contains(args.event.target  as Node)) {
      sourceSchedule = this.secondSchedule;
      targetSchedule = this.firstSchedule;
    } else if (this.secondSchedule && this.secondSchedule.element.contains(args.event.target  as Node)) {
      sourceSchedule = this.firstSchedule;
      targetSchedule = this.secondSchedule;
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

  render() {
    return (<div className='schedule-control-section'>
      <div className="col-lg-12 control-section">
        <div className="content-wrapper multiple-schedulers">
          <div className="schedule-container">
            <ScheduleComponent id="first-schedule" width='100%' height='500px' ref={(schedule: any) => this.firstSchedule = schedule} selectedDate={new Date(2023, 0, 1)} dragStop={this.handleDragStop} dragStart={this.calculateEventDuration} eventDragArea='.content-wrapper' group={{ resources: ['Employees'] }} rowAutoHeight={true} eventSettings={this.eventSettings}>
              <ResourcesDirective>
                <ResourceDirective field='TaskId' title='Employee' name='Employees' dataSource={this.firstScheduleResourceData} textField='text' idField='id' colorField='color' />
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Month, DragAndDrop, Resize]} />
            </ScheduleComponent>
            <ScheduleComponent id="second-schedule" width='100%' height='500px' ref={(schedule) => this.secondSchedule = schedule} selectedDate={new Date(2023, 0, 1)} dragStop={this.handleDragStop} dragStart={this.calculateEventDuration} eventDragArea='.content-wrapper' group={{ resources: ['Employees'] }} eventSettings={this.secondEventSettings}>
              <ResourcesDirective>
                <ResourceDirective field='TaskId' title='Employee' name='Employees' dataSource={this.secondScheduleResourceData} textField='text' idField='id' colorField='color' />
              </ResourcesDirective>
              <ViewsDirective>
                <ViewDirective option='Month' />
              </ViewsDirective>
              <Inject services={[DragAndDrop, Month, Resize]} />
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
    </div>);
  }
}

export default ScheduleDragAndDrop;