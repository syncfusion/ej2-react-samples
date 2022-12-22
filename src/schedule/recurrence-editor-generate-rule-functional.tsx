import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RecurrenceEditorComponent, RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-react-schedule';
import './recurrence-editor-rule.css';
import { updateSampleSection } from '../common/sample-base';

/**
 * Recurrence editor generate rule
 */

function RuleGenerate() {
  React.useEffect(() => {
    updateSampleSection();
  }, [])
  let recObject: RecurrenceEditorComponent;
  const recRule: string = 'FREQ=DAILY;INTERVAL=2;COUNT=8';

  function onChange(args: RecurrenceEditorChangeEventArgs): void {
    let outputElement: HTMLElement = document.querySelector('#rule-output') as HTMLElement;
    outputElement.innerText = args.value;
  }
  return (
    <div className='schedule-control-section'>
      <div className='control-section'>
        <div className='recurrence-editor-wrap'>
          <div className='generate-rule' style={{ paddingBottom: '15px' }}>
            <label>Rule Output</label>
            <div className='rule-output-container'>
              <div id='rule-output'>{recRule}</div>
            </div>
          </div>
          <div className='RecurrenceEditor'>
            <RecurrenceEditorComponent id='RecurrenceEditor' value={recRule} ref={t => recObject = t} change={onChange.bind(this)}></RecurrenceEditorComponent>
          </div>
        </div>
      </div>
      <div id='action-description'>
        <p>This demo showcases the recurrence rule generation based on the options selected from the Recurrence editor and it usually
          follows the <a href='https://tools.ietf.org/html/rfc5545#section-3.3.10' target='_blank'>iCalendar</a> specifications. This
          generated recurrence rule string is a valid one to be used with the Scheduler event’s recurrence rule field.</p>
      </div>
      <div id='description'>
        <p>
          In this demo, a specific rule has been set to the recurrence editor manually by making use of the <code>setRecurrenceRule</code> method which will be
          displayed on the label placed at the top of it. Also, when the user dynamically change the options in recurrence editor,
          the modified rule value as per the selection will be displayed on it which is retrieved within the <code>change</code> event.
        </p>
      </div>
    </div>
  );
}
export default RuleGenerate;