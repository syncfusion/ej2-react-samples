import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './calendar-component.css';
import { loadCldr, Internationalization } from '@syncfusion/ej2-base';
import { CalendarComponent, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as numberingSystems from '../common/cldr-data/supplemental/numberingSystems.json';
import * as degregorian from '../common/cldr-data/main/de/ca-gregorian.json';
import * as denumbers from '../common/cldr-data/main/de/numbers.json';
import * as detimeZoneNames from '../common/cldr-data/main/de/timeZoneNames.json';

/*  loadCldr method to load the culture specific JSON file.*/
loadCldr(numberingSystems, degregorian, denumbers, detimeZoneNames);

export class culture extends SampleBase<{}, {}> {
  private calendarInstance: CalendarComponent;
  private dropElement: HTMLSelectElement;
  public onValueChange(): void {
    debugger
    let globalize: Internationalization = new Internationalization(this.calendarInstance.locale);
    let culture: string = this.dropElement.value;
    this.calendarInstance.locale = culture;
    globalize = new Internationalization(this.calendarInstance.locale);
    if (this.calendarInstance.value) {
      (document.getElementById('date_label') as HTMLElement).textContent = 'Selected Value: ' + globalize.formatDate(this.calendarInstance.value);
    }
    this.calendarInstance.dataBind();
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-9'>
            <div className='calendar-control-section'>
              <CalendarComponent change={onChange} locale='de' ref={calendar => this.calendarInstance = calendar} ></CalendarComponent>
              <label id='date_label'>Selected Value:</label>
            </div>
          </div>
          <div className='col-lg-3 property-section'>
            <PropertyPane title='Properties'>
              <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div className='col-md-4' style={{ paddingTop: '8px' }}>
                      Culture
                    </div>
                  </td>
                  <td style={{ width: '70%', paddingRight: '10px' }}>
                    <div>
                      <select id='ddl' name='ddl' onChange={this.onValueChange.bind(this)} className='form-control' style={{ padding: '6px' }} ref={d => this.dropElement = d}>
                        <option value='de'>de</option>
                        <option value='en'>en</option>
                      </select>
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>

        <div id='description'>
          <p>
            The calendar control was rendered with German culture. Here the date separator, week header and month text content are updated based on current culture. you can also change the control culture by selecting it from the culture options in the properties panel.
          </p>
          <p>
            More information on the internationalization configuration can be found in this <a target='_blank'
              href='http://ej2.syncfusion.com/react/documentation/base/internationalization.html'>documentation</a> section.
        </p>
        </div>
      </div>
    )
  }
}
function onChange(args: ChangedEventArgs): void {
  (document.getElementById('date_label') as HTMLElement).textContent = 'Selected Value: ' + args.value.toLocaleDateString();
}