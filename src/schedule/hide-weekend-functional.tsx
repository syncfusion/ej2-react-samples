import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, Month, TimelineViews,
  TimelineMonth, EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { MultiSelectComponent, CheckBoxSelection, MultiSelectChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 *  Schedule hide non-working days sample
 */

MultiSelectComponent.Inject(CheckBoxSelection);

function HideWeekend() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let scheduleObj: ScheduleComponent;
  let btnObj: ButtonComponent;
  const data: Record<string, any>[] = extend([], (dataSource as any).employeeEventData, null, true) as Record<string, any>[];
  const weekDays: Record<string, any>[] = [
    { Name: 'Sunday', Value: '0' },
    { Name: 'Monday', Value: '1' },
    { Name: 'Tuesday', Value: '2' },
    { Name: 'Wednesday', Value: '3' },
    { Name: 'Thursday', Value: '4' },
    { Name: 'Friday', Value: '5' },
    { Name: 'Saturday', Value: '6' }
  ];
  const localFields: Record<string, any> = { text: 'Name', value: 'Value' };
  const value: string[] = ['1', '3', '4', '5'];

  function onChange(): void {
    if (btnObj.element.classList.contains('e-active')) {
      btnObj.content = 'Hide';
      scheduleObj.showWeekend = true;
    } else {
      btnObj.content = 'Show';
      scheduleObj.showWeekend = false;
    }
  }

  function onMultiSelectChange(args: MultiSelectChangeEventArgs): void {
    let value: number[] = (args.value as number[]).slice(0).map(Number).sort();
    scheduleObj.workDays = value.length === 0 ? [0] : value;
    scheduleObj.dataBind();
  }

  function OnEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, scheduleObj.currentView);
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='650px' ref={t => scheduleObj = t} workDays={[1, 3, 4, 5]}
            workHours={{ start: '08:00' }} selectedDate={new Date(2021, 1, 15)} eventSettings={{ dataSource: data }} showWeekend={false}
            eventRendered={OnEventRendered.bind(this)}>
            <ViewsDirective>
              <ViewDirective option='Day' />
              <ViewDirective option='Week' />
              <ViewDirective option='Month' />
              <ViewDirective option='TimelineWeek' />
              <ViewDirective option='TimelineMonth' />
            </ViewsDirective>
            <Inject services={[Day, Week, Month, TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 property-section'>
        <PropertyPane title='Properties'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div className='multi-prop'>
                    <div className='workdayscheckbox' style={{ paddingBottom: '10px' }}>
                      <MultiSelectComponent id='workdayscheckbox' dataSource={weekDays} fields={localFields} mode='CheckBox'
                        value={value} change={onMultiSelectChange.bind(this)} showDropDownIcon={true}
                        showClearButton={false} placeholder='Working days' floatLabelType='Always'>
                      </MultiSelectComponent>
                    </div>
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <div style={{ fontWeight: 500 }}>Non-Working days</div>
                  <div className='evtbtn' style={{ paddingBottom: '10px' }}>
                    <ButtonComponent title='Show/hide weekend' ref={(scope) => { btnObj = scope; }} isToggle={true}
                      onClick={onChange.bind(this)}>Show</ButtonComponent>
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
          and it is not applicable on <code>WorkWeek</code> view. By default, it is set to <code>true</code>.
          The days which are not a part of the working days collection of a Scheduler are usually considered as weekend days here.
        </p>
        <p>
          Here, the working days are defined as <code>[1, 3, 4, 5]</code> on Scheduler.
          Therefore, the remaining days (0, 2, 6 – Sunday, Tuesday and Saturday) are considered as weekend days
          and will be hidden from the views as the <code>showWeekend</code> property is set to false.
        </p>
      </div>
    </div>
  );
}
export default HideWeekend;