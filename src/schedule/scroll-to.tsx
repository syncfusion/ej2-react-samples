import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, TimelineViews, EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { TimePickerComponent, ChangeEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 *  Schedule scroll to particular hour sample
 */

export class ScrollTo extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];

  /*Apply scroll to the schedule component*/
  private onChange(args: ChangeEventArgs): void {
    this.scheduleObj.scrollTo(args.text);
  }

  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' ref={schedule => this.scheduleObj = schedule}
              selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: this.data }}
              eventRendered={this.onEventRendered.bind(this)}>
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
                    <div>
                      <TimePickerComponent value={new Date(2000, 0, 1, 9)} format='HH:mm'
                        change={this.onChange.bind(this)} placeholder='Scroll To' floatLabelType='Always'>
                      </TimePickerComponent>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id='action-description'>
          <p>This demo illustrates the way of manually scrolling to specific time on Schedule.</p>
        </div>
        <div id='description'>
          <p>In this demo, the way of manually scrolling to specific time on scheduler has been demonstrated by making use of the <code>scrollTo</code> method of Schedule.</p>
        </div>
      </div>
    );
  }
}