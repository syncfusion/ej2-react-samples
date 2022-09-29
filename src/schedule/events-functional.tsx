import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {
  ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Inject, Resize, DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 * Schedule events sample
 */

function Events() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let scheduleObj: ScheduleComponent;
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];

  function onEventRendered(args: EventRenderedArgs): void {
    applyCategoryColor(args, scheduleObj.currentView);
  }

  function onClear(): void {
    document.getElementById('EventLog').innerHTML = '';
  }

  function onCreate(): void {
    appendElement('Schedule <b>Load</b> event is triggered<hr>');
  }

  function onActionBegin(): void {
    appendElement('Schedule <b>Action Begin</b> event is triggered<hr>');
  }

  function onActionComplete(): void {
    appendElement('Schedule <b>Action Complete</b> event is triggered<hr>');
  }

  function onActionFailure(): void {
    appendElement('Schedule <b>Action Failure</b> event is triggered<hr>');
  }

  function onCellDoubleClick(): void {
    appendElement('SChedule <b>Cell Double Click</b> event is triggered<hr>');
  }

  function onCellClick(): void {
    appendElement('Schedule <b>Cell Click</b> event is triggered<hr>');
  }

  function onNavigating(): void {
    appendElement('Schedule <b>Navigating</b> event is triggered<hr>');
  }

  function onDestroyed(): void {
    appendElement('Schedule <b>Destroyed</b> event is triggered<hr>');
  }

  function onEventClick(): void {
    appendElement('Schedule <b>Event Click</b> event is triggered<hr>');
  }

  function onPopupOpen(): void {
    appendElement('Schedule <b>Popup Open</b> event is triggered<hr>');
  }

  function appendElement(html: string): void {
    let span: HTMLElement = document.createElement('span');
    span.innerHTML = html;
    let log: HTMLElement = document.getElementById('EventLog');
    log.insertBefore(span, log.firstChild);
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent ref={schedule => scheduleObj = schedule} width='100%' height='650px'
            selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: data }} created={onCreate.bind(this)}
            eventRendered={onEventRendered.bind(this)} actionBegin={onActionBegin.bind(this)}
            actionComplete={onActionComplete.bind(this)} actionFailure={onActionFailure.bind(this)}
            cellClick={onCellClick.bind(this)} cellDoubleClick={onCellDoubleClick.bind(this)}
            destroyed={onDestroyed.bind(this)} navigating={onNavigating.bind(this)}
            eventClick={onEventClick.bind(this)} popupOpen={onPopupOpen.bind(this)}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div className='col-lg-3 property-section'>
        <PropertyPane title='Event Trace'>
          <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
            <tbody>
              <tr style={{ height: '250px' }}>
                <td>
                  <div className='eventarea' style={{ height: '245px', overflow: 'auto' }}>
                    <span className='EventLog' id='EventLog' style={{ wordBreak: 'normal' }}></span>
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                  <div className='evtbtn' style={{ paddingBottom: '10px' }}>
                    <ButtonComponent title='Clear' onClick={onClear.bind(this)}>Clear</ButtonComponent>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id='action-description'>
        <p>This demo illustrates the client-side events that triggers on respective Scheduler actions and the same is being displayed
          on the event trace panel.</p>
      </div>
      <div id='description'>
        <p>
          In this demo, the client-side events that triggers based on the action taking place in Scheduler has been demonstrated. The
          user can make use of these events, if at some point they need to perform some custom actions or any needed additional
          customizations on the available Scheduler features.
        </p>
      </div>
    </div>
  );
}
export default Events;