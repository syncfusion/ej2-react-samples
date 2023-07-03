import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, EventRenderedArgs, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './editor-template.css';
import { extend } from '@syncfusion/ej2-base';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * Schedule editor template sample
 */

const EditorTemplate = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let scheduleObj = useRef<ScheduleComponent>(null);
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).doctorsEventData, null, true) as Record<string, any>[];

  const onEventRendered = (args: EventRenderedArgs): void => {
    switch (args.data.EventType) {
      case 'Requested':
        (args.element as HTMLElement).style.backgroundColor = '#F57F17';
        break;
      case 'Confirmed':
        (args.element as HTMLElement).style.backgroundColor = '#7fa900';
        break;
      case 'New':
        (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
        break;
    }
  }

  const onActionBegin = (args: Record<string, any>): void => {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      let data: Record<string, any> = args.data instanceof Array ? args.data[0] : args.data;
      args.cancel = !scheduleObj.current.isSlotAvailable(data.StartTime as Date, data.EndTime as Date);
    }
  }

  const editorTemplate = (props: Record<string, any>) => {
    return ((props !== undefined) ? 
      <table className="custom-event-editor" style={{ width: '100%' }} cellPadding={5}>
        <tbody>
          <tr>
            <td className="e-textlabel">Summary</td>
            <td colSpan={4}>
              <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Status</td>
            <td colSpan={4}>
              <DropDownListComponent id="EventType" placeholder='Choose status' data-name='EventType' className="e-field" style={{ width: '100%' }} dataSource={['New', 'Requested', 'Confirmed']} />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">From</td>
            <td colSpan={4}>
              <DateTimePickerComponent id="StartTime" format='dd/MM/yy hh:mm a' data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field" />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">To</td><td colSpan={4}>
              <DateTimePickerComponent id="EndTime" format='dd/MM/yy hh:mm a' data-name="EndTime" value={new Date(props.endTime || props.EndTime)} className="e-field" />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Reason</td>
            <td colSpan={4}>
              <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }} />
            </td>
          </tr>
        </tbody>
      </table >
      : 
      <div></div>
    );
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='650px' selectedDate={new Date(2021, 1, 15)} ref={scheduleObj} eventSettings={{ dataSource: data }} editorTemplate={editorTemplate} actionBegin={onActionBegin} showQuickInfo={false} eventRendered={onEventRendered}>
            <ViewsDirective>
              <ViewDirective option='Day' />
              <ViewDirective option='Week' />
              <ViewDirective option='WorkWeek' />
              <ViewDirective option='Month' />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div id='action-description'>
        <p>
          This demo illustrates the way of customizing the default editor window with custom template option and the customized
          design is automatically replaced onto the usual event editor. Here, a doctor's daily appointment with his patients is listed
          out and shaded with specific color based on its status.
        </p>
      </div>
      <div id='description'>
        <p>
          In this demo, the event window is customized based on the specific appointment-related fields required for doctors which can 
          be achieved by making use of the <code>editorTemplate</code> API and it is achieved using <code>functional component</code>.
        </p>
        <p>
          Each field defined through it should contain the <code>e-field</code> class,and <code>data-name</code> attribute,
          so as to allow the processing of those fields in the default event object from internal source.
        </p>
        <p>
          Within the <code>eventRendered</code> event that triggers before every appointment getting rendered
          on the Scheduler user interface, the colors for the appointments are set based on its status which is retrieved from the appointment data.
        </p>
        <p>
          The additional restriction has been added to the Scheduler cells such that if a cell already contains an appointment – then
          it should be prevented to book with multiple appointments on the same time for which the <code>isSlotAvailable</code> method is used.
          This method returns true, if the underlying cell is available for adding new events by checking whether it already has any events in it.
        </p>
      </div>
    </div>
  );
}
export default EditorTemplate;