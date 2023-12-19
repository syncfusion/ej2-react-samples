import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, TimelineViews, EventRenderedArgs, Inject, Resize, DragAndDrop, View } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 * Schedule start and end hour sample
 */

const DayHourLimit = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const scheduleObj = useRef<ScheduleComponent>(null);
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).employeeEventData, null, true) as Record<string, any>[];
  const [startTime, setStartTime] = useState<string>('08:00');
  const [endTime, setEndTime] = useState<string>('20:00');
  const [startHour, setStartHour] = useState<string>(startTime);
  const [endHour, setEndHour] = useState<string>(endTime);
  const onSubmit = (): void => {
    setStartHour(startTime)
    setEndHour(endTime)
  }
  const onStartTimeChange = (args: any) => {
    setStartTime(args.target.element.value)
  }
  const onEndTimeChange = (args: any) => {
    setEndTime(args.target.element.value)
  }
  const onEventRendered = (args: EventRenderedArgs): void => {
    applyCategoryColor(args, scheduleObj.current?.currentView as View);
  }
  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='650px' ref={scheduleObj} startHour={startHour} endHour={endHour} selectedDate={new Date(2021, 1, 15)} eventSettings={{ dataSource: data }} workHours={{ highlight: false }} eventRendered={onEventRendered}>
            <ViewsDirective>
              <ViewDirective option='Day' />
              <ViewDirective option='Week' />
              <ViewDirective option='TimelineDay' />
              <ViewDirective option='TimelineWeek' />
            </ViewsDirective>
            <Inject services={[Day, Week, TimelineViews, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 property-section'>
        <PropertyPane title='Properties'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div className='timepicker-control-section range'>
                    <TimePickerComponent id='startTime' value={new Date(2000, 0, 1, 8)} format='HH:mm' placeholder='Start Hour' floatLabelType='Always' onChange={onStartTimeChange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div className='timepicker-control-section range'>
                    <TimePickerComponent id='endTime' value={new Date(2000, 0, 1, 20)} format='HH:mm' placeholder='End Hour' floatLabelType='Always' onChange={onEndTimeChange.bind(this)} />
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                  <div className='evtbtn' style={{ paddingBottom: '10px' }}>
                    <ButtonComponent id='submit' title='Submit' onClick={onSubmit}>Submit</ButtonComponent>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id='action-description'>
        <p>This demo depicts how to restrict the start and end hours of Schedule, thus limiting it to display only the given hour range.</p>
      </div>
      <div id='description'>
        <p>
          In this demo, the Scheduler is made to display from 8 AM to 8 PM and the rest of the hours are hidden, as it is restricted
          to start from <code>08:00</code> hours and end on <code>20:00</code> hours by setting to <code>startHour</code> and <code>endHour</code> properties respectively.
        </p>
      </div>
    </div>
  );
}
export default DayHourLimit;