import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Week, WorkWeek, Month, TimelineViews, TimelineMonth, EventRenderedArgs, Inject, Resize, DragAndDrop, View, NavigatingEventArgs } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 * Schedule Work days sample
 */

const WorkDays = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const scheduleObj = useRef<ScheduleComponent>(null);
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).employeeEventData, null, true) as Record<string, any>[];
  const [workDays, setWorkDays] = useState<number[]>([1, 3, 5]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(0);
  const [currentView, setCurrentView] = useState<View>('WorkWeek');
  const workDaysOptions: Record<string, any>[] = [
    { text: 'Mon, Wed, Fri', value: '1,3,5' },
    { text: 'Mon, Tue, Wed, Thu, Fri', value: '1,2,3,4,5' },
    { text: 'Tue, Wed, Thu, Fri', value: '2,3,4,5' },
    { text: 'Thu, Fri, Sat, Mon, Tue', value: '4,5,6,1,2' }
  ];
  const dayOfWeekOptions: Record<string, any>[] = [
    { text: 'Sunday', value: 0 },
    { text: 'Monday', value: 1 },
    { text: 'Tuesday', value: 2 },
    { text: 'Wednesday', value: 3 },
    { text: 'Thursday', value: 4 },
    { text: 'Friday', value: 5 },
    { text: 'Saturday', value: 6 }
  ];
  const fields: Record<string, any> = { text: 'text', value: 'value' };

  const onWorkDaysChange = (args: ChangeEventArgs): void => {
    setWorkDays(args.value.toString().split(',').map(Number));
    scheduleObj.current.dataBind();
  }

  const onDayOfWeekChange = (args: ChangeEventArgs): void => {
    setFirstDayOfWeek(args.value as number);
    scheduleObj.current.dataBind();
  }

  const onEventRendered = (args: EventRenderedArgs): void => {
    applyCategoryColor(args, currentView);
  }

  const onNavigating = (args: NavigatingEventArgs) => {
    setCurrentView(args.currentView as View);
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='650px' ref={scheduleObj} workHours={{ start: '08:00' }} currentView={currentView} selectedDate={new Date(2021, 1, 15)} eventSettings={{ dataSource: data }} workDays={workDays} firstDayOfWeek={firstDayOfWeek} eventRendered={onEventRendered} navigating={onNavigating}>
            <ViewsDirective>
              <ViewDirective option='Week' />
              <ViewDirective option='WorkWeek' />
              <ViewDirective option='Month' />
              <ViewDirective option='TimelineWeek' />
              <ViewDirective option='TimelineMonth' />
            </ViewsDirective>
            <Inject services={[Week, WorkWeek, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 property-section'>
        <PropertyPane title='Properties'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div>
                    <DropDownListComponent style={{ padding: '6px' }} value={'1,3,5'} dataSource={workDaysOptions} fields={fields} change={onWorkDaysChange} popupWidth='180px' placeholder='Work days' floatLabelType='Always' />
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div>
                    <DropDownListComponent style={{ padding: '6px' }} value={firstDayOfWeek} dataSource={dayOfWeekOptions} fields={fields} change={onDayOfWeekChange} placeholder='First day of week' floatLabelType='Always' />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id='action-description'>
        <p>This demo showcases how to set customized working days as well as first day of a week on Schedule.</p>
      </div>
      <div id='description'>
        <p>
          In this demo, the working days of a week can be set on Scheduler using the <code>workDays</code> property
          which accepts the collection of day indexes (from 0 to 6) of a week.
          By default, it is set to <code>[1, 2, 3, 4, 5]</code> and in this demo,
          it has been set to <code>[1, 3, 5]</code> which means that <code>Monday, Wednesday, Friday</code>
          is being set as working days of a week and is visually differentiated from non-working days. The working hours usually
          applies only on these given working days.
        </p>
        <p>
          The first day of the week can also be set on the Scheduler by making use of the <code>firstDayOfWeek</code> property,
          doing so which will make the Scheduler to start with that day.
        </p>
        <p>
          <strong>Note: </strong> Here, Sunday is always denoted as 0, Monday as 1 and so on.
        </p>
      </div>
    </div>
  );
}
export default WorkDays;