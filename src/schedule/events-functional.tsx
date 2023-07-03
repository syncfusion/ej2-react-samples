import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { createElement, extend } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

/**
 * Schedule events sample
 */

const Events = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])

  const [eventLog, setEventLog] = useState("");
  let scheduleObj = useRef<ScheduleComponent>(null);
  let eventObj = useRef(null);
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).scheduleData, null, true) as Record<string, any>[];

  const onEventRendered = (args: EventRenderedArgs): void => {
    applyCategoryColor(args, scheduleObj.current.currentView);
  }

  const onClear = (): void => {
    setEventLog('');
  }

  const onCreate = (): void => {
    appendElement('Load');
  }

  const onActionBegin = (): void => {
    appendElement('Action Begin');
  }

  const onActionComplete = (): void => {
    appendElement('Action Complete');
  }

  const onActionFailure = (): void => {
    appendElement('Action Failure');
  }

  const onCellDoubleClick = (): void => {
    appendElement('Cell Double Click');
  }

  const onCellClick = (): void => {
    appendElement('Cell Click');
  }

  const onNavigating = (): void => {
    appendElement('Navigating');
  }

  const onDestroyed = (): void => {
    appendElement('Destroyed');
  }

  const onEventClick = (): void => {
    appendElement('Event Click');
  }

  const onPopupOpen = (): void => {
    appendElement('Popup Open');
  }

  const appendElement = (html: string): void => {
    setEventLog(prevLog => `Schedule <b>${html}</b> event is triggered<hr>${prevLog}`);
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-9 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent ref={scheduleObj} width='100%' height='650px' selectedDate={new Date(2021, 0, 10)} eventSettings={{ dataSource: data }} created={onCreate} eventRendered={onEventRendered} actionBegin={onActionBegin} actionComplete={onActionComplete} actionFailure={onActionFailure} cellClick={onCellClick} cellDoubleClick={onCellDoubleClick} destroyed={onDestroyed} navigating={onNavigating} eventClick={onEventClick} popupOpen={onPopupOpen}>
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
                    <span className='EventLog' id='EventLog' style={{ wordBreak: 'normal' }} ref={eventObj} dangerouslySetInnerHTML={{ __html: eventLog }}></span>
                  </div>
                </td>
              </tr>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '30%' }}>
                  <div className='evtbtn' style={{ paddingBottom: '10px' }}>
                    <ButtonComponent title='Clear' onClick={onClear}>Clear</ButtonComponent>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
      <div id='action-description'>
        <p>This demo illustrates the client-side events that triggers on respective Scheduler actions and the same is being displayed on the event trace panel.</p>
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