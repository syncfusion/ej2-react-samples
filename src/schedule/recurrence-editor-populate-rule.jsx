import * as React from 'react';
import { RecurrenceEditorComponent } from '@syncfusion/ej2-react-schedule';
import './recurrence-editor-rule.css';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
/**
 * Recurrence editor populate rule
 */
export class PopulateRule extends SampleBase {
    constructor() {
        super(...arguments);
        this.datas = [
            { rule: 'FREQ=DAILY;INTERVAL=1' },
            { rule: 'FREQ=DAILY;INTERVAL=2;UNTIL=20410606T000000Z' },
            { rule: 'FREQ=DAILY;INTERVAL=2;COUNT=8' },
            { rule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;UNTIL=20410729T000000Z' },
            { rule: 'FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1;UNTIL=20410729T000000Z' },
            { rule: 'FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1' },
            { rule: 'FREQ=YEARLY;BYDAY=MO;BYSETPOS=-1;INTERVAL=1;COUNT=5' }
        ];
        this.fields = { text: 'rule', value: 'rule' };
    }
    // call the change event's function after initialized the component.
    rendereComplete() {
        this.recObject.setRecurrenceRule('FREQ=DAILY;INTERVAL=2;COUNT=8');
    }
    onChange(e) {
        this.recObject.setRecurrenceRule(e.value);
    }
    render() {
        return (<div className='schedule-control-scetion'>
        <div className='control-section'>
          <div className='content-wrapper recurrence-editor-wrap'>
            <div style={{ paddingBottom: '15px' }}>
              Select Rule
              <DropDownListComponent id='RecurrenceList' dataSource={this.datas} index={2} fields={this.fields} change={this.onChange.bind(this)} popupHeight='200px'/>
            </div>
            <div className='RecurrenceEditor'>
              <RecurrenceEditorComponent id='RecurrenceEditor' ref={t => this.recObject = t}></RecurrenceEditorComponent>
            </div>
          </div>
        </div>
        <div id='action-description'>
          <p>This demo showcases how to fill the recurrence editor fields with appropriate values
          based on the user-provided recurrence rule string.</p>
        </div>
        <div id='description'>
          <p>
            In this demo, the <code>setRecurrenceRule</code> method
             is used to populate the fields of recurrence editor based on the static rule options selected from the dropdown list.
          </p>
        </div>
      </div>);
    }
}
