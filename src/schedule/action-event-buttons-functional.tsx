import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, Inject, Resize, DragAndDrop, EventRenderedArgs
} from '@syncfusion/ej2-react-schedule';
import './action-event-buttons.css';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * Schedule event action buttons sample
 */

interface AppointmentData {
  Id: number;
  Subject: string;
  StartTime: Date;
  EndTime: Date;
  CategoryColor?: string;
}

const ActionEventButtons = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])

  const scheduleRef = useRef<ScheduleComponent>(null);
  const instance = new Internationalization();
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).actionEventData, null, true) as Record<string, any>[];

  const getTimeString = (value: Date): string => {
    return instance.formatDate(value, { format: 'HH:mm' });
  }

  const applyCategoryColor = (categoryColor: string, args: EventRenderedArgs, currentView: string): void => {
    if (!args.element || !categoryColor) {
      return;
    }
    if (currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  const editEvent = (eventData: AppointmentData) => {
    if (scheduleRef.current) {
      const eventCopy = { ...eventData };
      scheduleRef.current.openEditor(eventCopy, 'Save', true);
    }
  }

  const deleteEvent = (eventData: AppointmentData) => {
    if (scheduleRef.current) {
      scheduleRef.current.deleteEvent(eventData);
    }
  }

  const eventTemplate = (props: AppointmentData): JSX.Element => {
    return (
      <div>
        <div className="custom-event">
          <div className="event-subject">
            <span className="event-title">{props.Subject}</span>
          </div>
          <div className="event-actions">
            <button 
              className="icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                editEvent(props);
              }}>
              <span className="e-icons e-edit"></span>
            </button>
            <button 
              className="icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteEvent(props);
              }}>
              <span className="e-icons e-trash"></span>
            </button>
          </div>
        </div>
        <div className="event-time">Time: {getTimeString(props.StartTime)} - {getTimeString(props.EndTime)}</div>
      </div>
    );
  }

  const onEventRendered = (args: EventRenderedArgs): void => {
    const eventData = args.data as AppointmentData;
    const categoryColor = eventData.CategoryColor;
    applyCategoryColor(categoryColor, args, 'Week');
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper action-button'>
          <ScheduleComponent 
            cssClass='action-event-buttons'
            ref={scheduleRef}
            width='100%' 
            height='650px' 
            selectedDate={new Date(new Date().getFullYear(), 0, 16)}
            eventSettings={{ dataSource: data, template: eventTemplate }}
            eventRendered={onEventRendered}
          >
            <ViewsDirective>
              <ViewDirective option='Day'/>
              <ViewDirective option='Week'/>
            </ViewsDirective>
            <Inject services={[Day, Week, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div id='action-description'>
        <p>
          This demo showcases the event action buttons for editing and deleting events in day and week views. Click the edit or delete icons to manage your events.
        </p>
      </div>
      <div id='description'>
        <p>
          In this demo, we have implemented custom event templates with action buttons for each event displayed in the Scheduler. These action buttons allow users to edit or delete events directly from the event cells. When the Edit button is clicked, the event editor is opened using the <code>openEditor</code> method. When the Delete button is clicked, the selected event is removed using the <code>deleteEvent</code> method.
        </p>
        <p>
          Looking for the full React Scheduler component overview, features, pricing, and documentation? Visit our <a target="_blank" href="https://www.syncfusion.com/scheduler-sdk/react-scheduler">React Scheduler</a> component page.
        </p>
      </div>
    </div>
  );
}
export default ActionEventButtons;