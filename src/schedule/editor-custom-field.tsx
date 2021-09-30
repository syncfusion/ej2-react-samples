import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { createElement, extend } from '@syncfusion/ej2-base';
import {
  ScheduleComponent, Day, Week, WorkWeek, Month, Agenda,
  PopupOpenEventArgs, EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 *  Schedule editor custom fields sample
 */

export class EditorCustomField extends SampleBase<{}, {}> {
  private scheduleObj: ScheduleComponent;
  private data: Record<string, any>[] = extend([], (dataSource as any).eventsData, null, true) as Record<string, any>[];

  private onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      // Create required custom elements in initial time
      if (!args.element.querySelector('.custom-field-row')) {
        let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
        let formElement: HTMLElement = args.element.querySelector('.e-schedule-form');
        formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
        let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
        let inputEle: HTMLInputElement = createElement('input', {
          className: 'e-field', attrs: { name: 'EventType' }
        }) as HTMLInputElement;
        container.appendChild(inputEle);
        row.appendChild(container);
        let dropDownList: DropDownList = new DropDownList({
          dataSource: [
            { text: 'Public Event', value: 'public-event' },
            { text: 'Maintenance', value: 'maintenance' },
            { text: 'Commercial Event', value: 'commercial-event' },
            { text: 'Family Event', value: 'family-event' }
          ],
          fields: { text: 'text', value: 'value' },
          value: args.data.EventType as string,
          floatLabelType: 'Always', placeholder: 'Event Type'
        });
        dropDownList.appendTo(inputEle);
        inputEle.setAttribute('name', 'EventType');
      }
    }
  }

  private onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, this.scheduleObj.currentView);
  }

  render() {
    return (
      <div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='650px' selectedDate={new Date(2021, 1, 15)} ref={t => this.scheduleObj = t}
              eventSettings={{ dataSource: this.data }} popupOpen={this.onPopupOpen.bind(this)}
              eventRendered={this.onEventRendered.bind(this)}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
          </div>
        </div>
        <div id='action-description'>
          <p>This demo shows how to add additional fields to the default editor window.
            Here, an additional field <code>Event Type</code> has been added
            to the default event editor and its value is processed accordingly.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, the additional field is added to the default event editor by making use of the
            <code>popupOpen</code> event which gets triggered before the event editor getting opened on Scheduler.
            <code>popupOpen</code> is a client-side event that triggers before any of the popups getting opened on Scheduler.
          </p>
          <p>
            Here, the additional field (any of the form elements) is needed to be provided with the common class
            <code>e-field</code>, so as to handle and process those additional data into the default event object.
          </p>
        </div>
      </div>
    );
  }
}