import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Inject, Resize, DragAndDrop, View } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 *  Schedule editor validation sample
 */

const EditorFieldValidation = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const scheduleObj = useRef<ScheduleComponent>(null);
  const data: Record<string, any>[] = extend([], (dataSource as any).scheduleData, null, true) as Record<string, any>[];
  const fields = {
    subject: { name: 'Subject', validation: { required: true } },
    location: {
      name: 'Location', validation: {
        required: true,
        regex: ['^[a-zA-Z0-9- ]*$', 'Special characters are not allowed in this field']
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

  const onEventRendered = (args: EventRenderedArgs): void => {
    applyCategoryColor(args, scheduleObj.current?.currentView as View);
  }
  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='550px' ref={scheduleObj} selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: data, fields: fields }} eventRendered={onEventRendered}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
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
export default EditorFieldValidation;