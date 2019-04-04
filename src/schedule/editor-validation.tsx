import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, Day, Week, WorkWeek, Month,
  EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 *  Schedule editor validation sample
 */

export class EditorFieldValidation extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], (dataSource as any).scheduleData, null, true) as Object[];
  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }
  private fields = {
    subject: { name: 'Subject', validation: { required: true } },
    location: {
      name: 'Location', validation: {
        required: true,
        regex: ['^[a-zA-Z0-9- ]*$', 'Special character(s) not allowed in this field']
      }
    },
    description: {
      name: 'Description', validation: {
        required: true, minLength: 5, maxLength: 500
      }
    },
    startTime: { name: 'StartTime', validation: { required: true } },
    endTime: { name: 'EndTime', validation: { required: true } }
  };

  render() {
    return (
      <div className='schedule-control-scetion'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='550px' selectedDate={new Date(2019, 0, 10)} ref={t => this.scheduleObj = t}
              eventSettings={{ dataSource: this.data, fields: this.fields }} eventRendered={this.onEventRendered.bind(this)}>
              <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id='action-description'>
          <p>This demo shows the way of adding default and custom validation rules to the editor fields of Scheduler.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, the specific fields of Scheduler editor window such as
        <code>subject</code>,
        <code>location</code>,
        <code>description</code>,
        <code>startTime</code> and
        <code>endTime</code> are made to undergo validation such that if it is left as blank, then the default required validation message
                                                                                 will be displayed in a separate tooltip, on clicking a save button.
          </p>
          <p>
            Additionally, the regex condition has been added to the <code>location</code> field,
            so that if any special characters are typed into it, then the custom validation message will be displayed.
            The <code>description</code> field
            has been validated to restrict the character count to be typed into it between 5 and 500 and not beyond that.
             This validation can be given by making use of the <code>validation</code> API
              available within each <code>fields</code> of <code>eventSettings</code> property.
          </p>
          <p>
            Apart from this validation feature, the built-in validation has been provided to the start and end time fields - so that,
            when the selected end time occurs before the start time, a validation message will be displayed as well as when some
            unwanted characters are typed into the date fields, the invalid date message will be alerted.
          </p>
        </div>
      </div>
    );
  }
}