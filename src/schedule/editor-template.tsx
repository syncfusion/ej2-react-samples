import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month,
  PopupOpenEventArgs, EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { doctorsEventData } from './datasource';
import './editor-template.css';
import { extend } from '@syncfusion/ej2-base';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';

/**
 * Schedule editor template sample
 */

export class EditorTemplate extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Object[] = extend([], doctorsEventData, null, true) as Object[];
  private onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
      statusElement.setAttribute('name', 'EventType');
    }
  }
  private onEventRendered(args: EventRenderedArgs): void {
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
  private onActionBegin(args: { [key: string]: Object }): void {
    if (args.requestType === 'eventCreate') {
      let data: { [key: string]: Object } = args.data as { [key: string]: Object };
      if (!this.scheduleObj.isSlotAvailable(data.StartTime as Date, data.EndTime as Date)) {
        args.cancel = true;
      }
    }
  }
  private editorTemplate(props): JSX.Element {
    return (<table className="custom-event-editor" style={{ width: '100%', cellpadding: '5' }}><tbody>
      <tr><td className="e-textlabel">Summary</td><td style={{ colspan: '4' }}>
        <input id="Summary" className="e-field e-input" type="text" name="Subject" style={{ width: '100%' }} />
      </td></tr>
      <tr><td className="e-textlabel">Status</td><td style={{ colspan: '4' }}>
        <DropDownListComponent id="EventType" placeholder='Choose status' className="e-field" style={{ width: '100%' }}
          dataSource={['New', 'Requested', 'Confirmed']}>
        </DropDownListComponent>
      </td></tr>
      <tr><td className="e-textlabel">From</td><td style={{ colspan: '4' }}>
        <DateTimePickerComponent id="StartTime" className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">To</td><td style={{ colspan: '4' }}>
        <DateTimePickerComponent id="EndTime" className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">Reason</td><td style={{ colspan: '4' }}>
        <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50}
          style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></textarea>
      </td></tr></tbody></table >
    );
  }
  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' selectedDate={new Date(2018, 1, 15)}
              ref={schedule => this.scheduleObj = schedule}
              eventSettings={{ dataSource: this.data }} editorTemplate={this.editorTemplate.bind(this)}
              showQuickInfo={false} popupOpen={this.onPopupOpen.bind(this)} eventRendered={this.onEventRendered.bind(this)}
              actionBegin={this.onActionBegin.bind(this)}>
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
          <p>This demo illustrates the way of customizing the default editor window with custom template option and the customized
          design is automatically replaced onto the usual event editor. Here, a doctor's daily appointment with his patients is listed
          out and shaded with specific color based on its status.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, the event window is customized based on the doctor's required appointment related fields which can be achieved
            by making use of the <code>editorTemplate</code> API.
            Here, the custom design is built with the required fields through the script template
             and its type should be <code>text/x-template</code>.
          </p>
          <p>
            Each field defined through it should contain the <code>e-field</code> class,
            so as to allow the processing of those fields in the default event object from internal source.
            The ID of this customized script template section is assigned to the <code>editorTemplate</code> option,
            so that this customized fields will be replaced onto the default editor window.
          </p>
          <p>
            As we are using our Syncfusion sub-components within this editor in this demo, therefore the custom defined form elements
            needs to be configured as required Syncfusion components such as DropDownList and DateTimePicker which needs to be
            done within the <code>popupOpen</code> event. This particular step can be skipped,
            if the user needs to simply use the normal form design with applicable
            fields.
          </p>
          <p>
            Within the <code>eventRendered</code> event that triggers before every appointment getting rendered
             on the Schedule user interface,
        the colors for the appointments are set based on its status which is retrieved from the appointment data.
          </p>
          <p>
            The additional restriction has been added to the Schedule cells such that if a cell already contains an appointment – then
            it should be prevented to book with multiple appointments on the same time
             for which the <code>isSlotAvailable</code> method is used.
This method returns true, if the underlying cell is available for adding new events
by checking whether it already has any events in it.
          </p>
        </div>
      </div>
    );
  }
}