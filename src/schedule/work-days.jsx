import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Week, WorkWeek, Month, TimelineViews, TimelineMonth, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
/**
 * Schedule Work days sample
 */
export class WorkDays extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = extend([], dataSource.employeeEventData, null, true);
        this.workDays = [1, 3, 5];
        this.workDaysOptions = [
            { text: 'Mon, Wed, Fri', value: '1,3,5' },
            { text: 'Mon, Tue, Wed, Thu, Fri', value: '1,2,3,4,5' },
            { text: 'Tue, Wed, Thu, Fri', value: '2,3,4,5' },
            { text: 'Thu, Fri, Sat, Mon, Tue', value: '4,5,6,1,2' }
        ];
        this.dayOfWeekOptions = [
            { text: 'Sunday', value: 0 },
            { text: 'Monday', value: 1 },
            { text: 'Tuesday', value: 2 },
            { text: 'Wednesday', value: 3 },
            { text: 'Thursday', value: 4 },
            { text: 'Friday', value: 5 },
            { text: 'Saturday', value: 6 }
        ];
        this.fields = { text: 'text', value: 'value' };
    }
    onWorkDaysChange(args) {
        this.scheduleObj.workDays = args.value.toString().split(',').map(Number);
        this.scheduleObj.dataBind();
    }
    onDayOfWeekChange(args) {
        this.scheduleObj.firstDayOfWeek = args.value;
        this.scheduleObj.dataBind();
    }
    onEventRendered(args) {
        applyCategoryColor(args, this.scheduleObj.currentView);
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' ref={schedule => this.scheduleObj = schedule} workHours={{ start: '08:00' }} currentView='WorkWeek' selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }} workDays={this.workDays} eventRendered={this.onEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewDirective option='Week'/>
                <ViewDirective option='WorkWeek'/>
                <ViewDirective option='Month'/>
                <ViewDirective option='TimelineWeek'/>
                <ViewDirective option='TimelineMonth'/>
              </ViewsDirective>
              <Inject services={[Week, WorkWeek, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop]}/>
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Work days</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <DropDownListComponent style={{ padding: '6px' }} value={'1,3,5'} dataSource={this.workDaysOptions} fields={this.fields} change={this.onWorkDaysChange.bind(this)} popupWidth='180px'>
                      </DropDownListComponent>
                    </div>
                  </td>
                </tr>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>First day of week</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div>
                      <DropDownListComponent style={{ padding: '6px' }} value={0} dataSource={this.dayOfWeekOptions} fields={this.fields} change={this.onDayOfWeekChange.bind(this)}>
                      </DropDownListComponent>
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
      </div>);
    }
}
