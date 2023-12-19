import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, View, Day, Week, WorkWeek, Month, EventRenderedArgs, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 * Schedule views sample
 */

const Views = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const scheduleObj = useRef<ScheduleComponent>(null);
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).zooEventsData, null, true) as Record<string, any>[];
  const viewOptions: Record<string, any>[] = [
    { text: 'Day', value: 'Day' },
    { text: 'Week', value: 'Week' },
    { text: 'WorkWeek', value: 'WorkWeek' },
    { text: 'Month', value: 'Month' }
  ];
  const fields: Record<string, any> = { text: 'text', value: 'value' };
  const [currentView, setCurrentView] = useState<any>("Week");
  const onViewChange = (args: ChangeEventArgs): void => {
    setCurrentView(args.value as View);
    scheduleObj.current?.dataBind();
  }

  const onEventRendered = (args: EventRenderedArgs): void => {
    applyCategoryColor(args, scheduleObj.current?.currentView as View);
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='650px' ref={scheduleObj} selectedDate={new Date(2021, 1, 15)} eventSettings={{ dataSource: data }} eventRendered={onEventRendered} currentView={currentView}>
            <ViewsDirective>
              <ViewDirective option='Day' />
              <ViewDirective option='Week' />
              <ViewDirective option='WorkWeek' />
              <ViewDirective option='Month' />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]} />
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
                    <DropDownListComponent style={{ padding: '6px' }} value={currentView} fields={fields} dataSource={viewOptions} change={onViewChange} placeholder='Current View' floatLabelType='Always' />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id='action-description'>
        <p>
          This demo showcases the usage of basic views available in Scheduler such as Day, Week, Work Week and Month. Here, the wildlife
          events being held in zoos are displayed against its respective timings.
        </p>
      </div>
      <div id='description'>
        <p>In this demo, Scheduler is showcased with 4 basic views namely</p>
        <ul>
          <li>Day</li>
          <li>Week</li>
          <li>Work Week</li>
          <li>Month</li>
        </ul>
        <p>
          The user can navigate between different view options available on the header section just by clicking on it. From any of
          the views, the user can switch back to the day view by clicking dates in the date header section. These view options
          to be displayed on the Scheduler header bar is based on the values ['Day', 'Week', 'WorkWeek', 'Month'] assigned to
          the <code>views</code> property.
        </p>
      </div>
    </div>
  );
}
export default Views;