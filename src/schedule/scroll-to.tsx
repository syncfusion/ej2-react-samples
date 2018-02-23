import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewsModelDirective, Day, Week, WorkWeek,
  EventRenderedArgs, Inject
} from '@syncfusion/ej2-react-schedule';
import { scheduleData, applyCategoryColor } from './datasource';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { TimePickerComponent, ChangeEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 *  Schedule scroll to particular hour sample
 */

export class ScrollTo extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], scheduleData, null, true) as Object[];
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
            <ScheduleComponent width='100%' height='550px' ref={schedule => this.scheduleObj = schedule}
              selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }}
              eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewsModelDirective option='Day' />
                <ViewsModelDirective option='Week' />
                <ViewsModelDirective option='WorkWeek' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr id='' style={{ height: '50px' }}>
                  <td style={{ width: '50%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Day Count:</div>
                  </td>
                  <td style={{ width: '50%' }}>
                    <div>
                      <TimePickerComponent width={100} value={new Date(2000, 0, 1, 9)} format='HH:mm'
                        change={this.onChange.bind(this)}></TimePickerComponent>
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
          <p>In this demo, the way of manually scrolling to specific time on schedule has been demonstrated by making
             use of the <code>scrollTo</code> method of Schedule.
          </p>
        </div>
      </div>
    );
  }
}