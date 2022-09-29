import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month,
  EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 *  Schedule view based configuration sample
 */

function ExtendedViews() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let scheduleObj: ScheduleComponent;
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).fifaEventsData, null, true) as Record<string, any>[];

  function onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, scheduleObj.currentView);
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='650px' ref={schedule => scheduleObj = schedule}
            selectedDate={new Date(2021, 5, 16)} eventSettings={{ dataSource: data }}
            eventRendered={onEventRendered.bind(this)}>
            <ViewsDirective>
              <ViewDirective option='Day' displayName='3 Days' interval={3} />
              <ViewDirective option='Week' displayName='2 Weeks' interval={2} isSelected={true} />
              <ViewDirective option='Month' displayName='4 Month' interval={4} />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div id='action-description'>
        <p>This demo illustrates how to display n number of days, weeks and months on a single view.</p>
      </div>
      <div id='description'>
        <p>
          In this demo, the <code>interval</code> property has been defined with different values on each view such as 3 on day view, 2 on week view and
          4 on month view – so that 3 days, 2 weeks and 4 months displayed on the respective views. This property is not applicable on agenda and month agenda views.
        </p>
      </div>
    </div>
  );
}
export default ExtendedViews;