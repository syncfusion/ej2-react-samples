import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewsModelDirective, View, Day, Week, WorkWeek, Month,
  EventRenderedArgs, Inject
} from '@syncfusion/ej2-react-schedule';
import { zooEventsData, applyCategoryColor } from './datasource';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 * Schedule views sample
 */

export class Views extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], zooEventsData, null, true) as Object[];
  public rendereComplete(): void {
    // Initialize DropDownList component for views
    let dropDownListObject: DropDownList = new DropDownList({
      change: (args: ChangeEventArgs) => {
        this.scheduleObj.currentView = args.value as View;
        this.scheduleObj.dataBind();
      }
    });
    dropDownListObject.appendTo('#currentview');
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
                <ViewsModelDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Day, Week, WorkWeek, Month]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr id='' style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Current view:</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <select id='currentview' name='currentview' style={{ padding: '6px' }} defaultValue='Week'>
                        <option value='Day'>Day</option>
                        <option value='Week'>Week</option>
                        <option value='WorkWeek'>Work Week</option>
                        <option value='Month'>Month</option>
                      </select>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id='action-description'>
          <p>This demo showcases the usage of basic views available in Schedule such as Day, Week, Work Week and Month. Here, the wildlife
        events being held in zoos are displayed against its respective timings.</p>
        </div>
        <div id='description'>
          <p>In this demo, Schedule is showcased with 4 basic views namely
          </p>
          <ul>
            <li>Day</li>
            <li>Week</li>
            <li>Work Week</li>
            <li>Month</li>
          </ul>
          <p>
            The user can navigate between different view options available on the header section just by clicking on it. From any of
            the views, the user can switch back to the day view by clicking dates in the date header section. These view options
            to be displayed on the Schedule header bar is based on the values ['Day', 'Week', 'WorkWeek', 'Month'] assigned to
            the <code>views</code> property.
          </p>
        </div>
      </div>
    );
  }
}