import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, TimelineViews, TimelineMonth, EventRenderedArgs, Inject, Resize, DragAndDrop, View, NavigatingEventArgs } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './cell-dimension.css';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 *  Schedule cell dimension sample
 */

const CellDimension = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).employeeEventData, null, true) as Record<string, any>[];
  const [currentView, setCurrentView] = useState<View>('Week');
  const onNavigating = (args: NavigatingEventArgs): void => {
    setCurrentView(args.currentView as View);
  }
  const onEventRendered = (args: EventRenderedArgs): void => {
    applyCategoryColor(args, currentView);
  }
  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent cssClass='schedule-cell-dimension' width='100%' height='650px' currentView={currentView} selectedDate={new Date(2021, 1, 15)} eventSettings={{ dataSource: data }} eventRendered={onEventRendered} navigating={onNavigating}>
            <ViewsDirective>
              <ViewDirective option='Day' />
              <ViewDirective option='Week' />
              <ViewDirective option='WorkWeek' />
              <ViewDirective option='Month' />
              <ViewDirective option='TimelineWeek' />
              <ViewDirective option='TimelineMonth' />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div id='action-description'>
        <p>
          This demo shows how to set the width and height of the cells by overriding the default CSS classes, so that the Scheduler
          events are viewable in a zoomed in style.
        </p>
      </div>
      <div id='description'>
        <p>
          In this demo, the height and width of the Scheduler cells are set by overriding the default CSS class.
        </p>
      </div>
    </div>
  );
}
export default CellDimension;