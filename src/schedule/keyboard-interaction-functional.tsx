import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventRenderedArgs, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';
import './schedule-component.css';
import { extend } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 *  Schedule keyboard interaction sample
 */

const KeyboardInteraction = () => {
  useEffect(() => {
    updateSampleSection();
    document.body.addEventListener("keydown", (e: KeyboardEvent) => {
      var scheduleElement = document.getElementById('Schedule');
      if (e.altKey && e.keyCode === 74 && scheduleElement) {
        scheduleElement.focus();
      }
    });
  }, []);
  let scheduleObj = useRef<ScheduleComponent>(null);
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).zooEventsData, null, true) as Record<string, any>[];

  const onEventRendered = (args: EventRenderedArgs): void => {
    applyCategoryColor(args, scheduleObj.current.currentView);
  }

  return (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent id='schedule' width='100%' height='650px' selectedDate={new Date(2021, 1, 15)} ref={scheduleObj} eventSettings={{ dataSource: data }} eventRendered={onEventRendered}>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
      <div id='action-description'>
        <p>This demo showcases the keyboard shortcuts applicable on Scheduler and also lists out in below description, how those applicable shortcuts interacts with Scheduler actions.</p>
      </div>
      <div id='description'>
        <p>
          All the Scheduler actions can be controlled via keyboard keys and is availed by using <code>allowKeyboardInteraction</code> property
          which is set to true by default. The applicable key combinations and its relative functionalities are listed below.
        </p>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <th style={{ width: '200px' }}>
                <strong>Keys</strong>
              </th>
              <th>
                <strong>Description</strong>
              </th>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Alt</kbd> + <kbd>j</kbd>
              </td>
              <td>Focuses the Scheduler [Provided from application end].</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Tab</kbd>
              </td>
              <td>Focuses the first or active item on the scheduler header bar and then move the focus to the next available event elements. If no events present, then focus moves out of the component.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Shift</kbd> + <kbd>Tab</kbd>
              </td>
              <td>Reverse focusing of the Tab functionality. Inverse focusing of event elements from the last one and then move onto the first or active item on Scheduler header bar and then moves out of the component.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Enter</kbd> key
              </td>
              <td>Opens the quick popup on the selected cells or events.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Escape</kbd> key
              </td>
              <td>Closes any of the popup that are in open state.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Arrow</kbd> keys
              </td>
              <td>To move onto the next available cells in either of the needed directions (left, right, top and right)</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Shift</kbd> + <kbd> Arrow</kbd> keys
              </td>
              <td>For multiple cell selection on either direction.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Delete</kbd> key
              </td>
              <td>Deletes one or more selected events.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Ctrl</kbd> + <kbd>Click</kbd> on events
              </td>
              <td>To select multiple events.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Alt</kbd> + <kbd>Number</kbd> keys (from 1 to 6)
              </td>
              <td>To switch between the views on Scheduler.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Ctrl</kbd> + <kbd>Left Arrow</kbd> keys
              </td>
              <td>To navigate to the previous date period.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Ctrl</kbd> + <kbd>Right Arrow</kbd> keys
              </td>
              <td>To navigate to the next date period.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Left</kbd> or <kbd>Right Arrow</kbd> keys
              </td>
              <td>On pressing any of these keys when focus is currently on the Scheduler header bar, moves the focus to the previous or next items in the header bar.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Space</kbd> or <kbd>Enter</kbd> keys
              </td>
              <td>It activates any of the focused items.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Page Up</kbd> & <kbd>Page Down</kbd> keys
              </td>
              <td>To scroll through the work cells area.</td>
            </tr>
            <tr>
              <td style={{ padding: '4px 0' }}>
                <kbd>Home</kbd> key
              </td>
              <td>To move the selection to the first cell of Scheduler.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default KeyboardInteraction;