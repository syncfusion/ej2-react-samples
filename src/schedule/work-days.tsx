import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewsModelDirective, Week, Month,
  EventRenderedArgs, Inject
} from '@syncfusion/ej2-react-schedule';
import { employeeEventData, applyCategoryColor } from './datasource';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

/**
 * Schedule Work days sample
 */

export class WorkDays extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], employeeEventData, null, true) as Object[];
  private workDays: number[] = [1, 3, 5];
  public rendereComplete(): void {
    // Initialize DropDownList component for work days
    let workDaysDropDown: DropDownList = new DropDownList({
      popupWidth: 180,
      change: (args: ChangeEventArgs) => {
        this.scheduleObj.workDays = args.value.toString().split(',').map(Number);
        this.scheduleObj.dataBind();
      }
    });
    workDaysDropDown.appendTo('#scheduleworkdays');

    // Initialize DropDownList component for first day of week
    let dayOfWeekDropDown: DropDownList = new DropDownList({
      change: (args: ChangeEventArgs) => {
        this.scheduleObj.firstDayOfWeek = parseInt(args.value as string, 10);
        this.scheduleObj.dataBind();
      }
    });
    dayOfWeekDropDown.appendTo('#scheduledayofweek');
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
              selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }} workDays={this.workDays}
              eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewsModelDirective option='Week' />
                <ViewsModelDirective option='Month' />
              </ViewsDirective>
              <Inject services={[Week, Month]} />
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr id='' style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Work days:</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <select id='scheduleworkdays' style={{ padding: '6px' }} defaultValue='1,3,5'>
                        <option value='1,3,5'>Mon, Wed, Fri</option>
                        <option value='1,2,3,4,5'>Mon, Tue, Wed, Thu, Fri</option>
                        <option value='2,3,4,5'>Tue, Wed, Thu, Fri</option>
                        <option value='4,5,6,1,2'>Thu, Fri, Sat, Mon, Tue</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr id='' style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>First day of week:</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <select id='scheduledayofweek' name='scheduledayofweek' style={{ padding: '6px' }}>
                        <option value='0'>Sunday</option>
                        <option value='1'>Monday</option>
                        <option value='2'>Tuesday</option>
                        <option value='3'>Wednesday</option>
                        <option value='4'>Thursday</option>
                        <option value='5'>Friday</option>
                        <option value='6'>Saturday</option>
                      </select>
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
            In this demo, the working days of a week can be set on Schedule using the <code>workDays</code> property 
            which accepts the collection of day indexes (from 0 to 6) of a week. 
            By default, it is set to <code>[1, 2, 3, 4, 5]</code> and in this demo, 
            it has been set to <code>[1, 3, 5]</code> which means that <code>Monday, Wednesday, Friday</code> 
            is being set as working days of a week and is visually differentiated from non-working days. The working hours usually
            applies only on these given working days.
          </p>
          <p>
            The first day of the week can also be set on the Schedule by making use of the <code>firstDayOfWeek</code> property, 
            doing so which will make the Schedule to start with that day.
          </p>
          <p>
            <strong>Note: </strong> Here, Sunday is always denoted as 0, Monday as 1 and so on.
          </p>
        </div>
      </div>
    );
  }
}