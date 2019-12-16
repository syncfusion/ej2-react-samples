import * as React from 'react';
import { RecurrenceEditorComponent } from '@syncfusion/ej2-react-schedule';
import './recurrence-editor-rule.css';
import { SampleBase } from '../common/sample-base';
/**
 * Recurrence editor generate rule
 */
export class RuleGenerate extends SampleBase {
    // call the change event's function after initialized the component.
    rendereComplete() {
        let outputElement = document.querySelector('#rule-output');
        this.recObject.setRecurrenceRule('FREQ=DAILY;INTERVAL=2;COUNT=8');
        outputElement.innerText = this.recObject.value;
    }
    onChange(args) {
        let outputElement = document.querySelector('#rule-output');
        outputElement.innerText = args.value;
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='control-section'>
          <div className='content-wrapper recurrence-editor-wrap'>
            <div className='generate-rule' style={{ paddingBottom: '15px' }}>
              <label>Rule Output</label>
              <div className='rule-output-container'>
                <div id='rule-output'></div>
              </div>
            </div>
            <div className='RecurrenceEditor'>
              <RecurrenceEditorComponent id='RecurrenceEditor' ref={t => this.recObject = t} change={this.onChange.bind(this)}></RecurrenceEditorComponent>
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
            In this demo, a specific rule has been set to the recurrence editor manually
           by making use of the <code>setRecurrenceRule</code> method which will be displayed on the label placed at the top of it.
                      Also, when the user dynamically change the options in recurrence editor,
           the modified rule value as per the selection will be displayed on it which is retrieved within the <code>change</code> event.
          </p>
        </div>
      </div>);
    }
}
