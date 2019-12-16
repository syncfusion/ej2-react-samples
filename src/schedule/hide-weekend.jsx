import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, Month, TimelineViews, TimelineMonth, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
/**
 *  Schedule hide non-working days sample
 */
MultiSelectComponent.Inject(CheckBoxSelection);
export class HideWeekend extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = extend([], dataSource.employeeEventData, null, true);
        this.weekDays = [
            { Name: 'Sunday', Value: '0' },
            { Name: 'Monday', Value: '1' },
            { Name: 'Tuesday', Value: '2' },
            { Name: 'Wednesday', Value: '3' },
            { Name: 'Thursday', Value: '4' },
            { Name: 'Friday', Value: '5' },
            { Name: 'Saturday', Value: '6' }
        ];
        // maps the appropriate column to fields property
        this.localFields = { text: 'Name', value: 'Value' };
        this.value = ['1', '3', '4', '5'];
    }
    onChange() {
        if (this.btnObj.element.classList.contains('e-active')) {
            this.btnObj.content = 'Hide';
            this.scheduleObj.showWeekend = true;
        }
        else {
            this.btnObj.content = 'Show';
            this.scheduleObj.showWeekend = false;
        }
    }
    onMultiSelectChange(args) {
        let value = args.value.slice(0).map(Number).sort();
        this.scheduleObj.workDays = value.length === 0 ? [0] : value;
        this.scheduleObj.dataBind();
    }
    OnEventRendered(args) {
        applyCategoryColor(args, this.scheduleObj.currentView);
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' ref={t => this.scheduleObj = t} workDays={[1, 3, 4, 5]} workHours={{ start: '08:00' }} selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }} showWeekend={false} eventRendered={this.OnEventRendered.bind(this)}>
              <ViewsDirective>
                <ViewDirective option='Day'/>
                <ViewDirective option='Week'/>
                <ViewDirective option='Month'/>
                <ViewDirective option='TimelineWeek'/>
                <ViewDirective option='TimelineMonth'/>
              </ViewsDirective>
              <Inject services={[Day, Week, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop]}/>
            </ScheduleComponent>
          </div>
        </div>
        <div className='col-lg-3 property-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
              <tbody>
                <tr id='' style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Working days</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div className='multi-prop'>
                      <div className='workdayscheckbox' style={{ paddingBottom: '10px' }}>
                        <MultiSelectComponent id='workdayscheckbox' dataSource={this.weekDays} fields={this.localFields} mode='CheckBox' value={this.value} showDropDownIcon={true} showClearButton={false} popupWidth={180} change={this.onMultiSelectChange.bind(this)}>
                        </MultiSelectComponent>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr id='' style={{ height: '50px' }}>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>Non-Working days</div>
                  </td>
                  <td style={{ width: '70%' }}>
                    <div className='evtbtn' style={{ paddingBottom: '10px' }}>
                      <ButtonComponent title='Show/hide weekend' ref={(scope) => { this.btnObj = scope; }} isToggle={true} onClick={this.onChange.bind(this)}>Show</ButtonComponent>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id='action-description'>
          <p>This demo depicts the way to show or hide the weekend days of a week on Scheduler. The days whichever not specified in
          working days collections will be taken into consideration as weekend days.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, the <code>showWeekend</code> property is used either to show or hide the weekend days of a week
           and it is not applicable on <code>workweek</code> view. By default, it is set to <code>true</code>.
                              The days which are not a part of the working days collection of a Scheduler are usually considered as weekend days here.
          </p>
          <p>
            Here, the working days are defined as <code>[1, 3, 4, 5]</code> on Scheduler.
            Therefore, the remaining days (0, 2, 6 – Sunday, Tuesday and Saturday) are considered as weekend days
          and will be hidden from the views as the <code>showWeekend</code> property is set to false.
          </p>
        </div>
      </div>);
    }
}
