import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './daterangepicker-component.css';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as numberingSystems from '../common/cldr-data/supplemental/numberingSystems.json';
import * as degregorian from '../common/cldr-data/main/de/ca-gregorian.json';
import * as denumbers from '../common/cldr-data/main/de/numbers.json';
import * as detimeZoneNames from '../common/cldr-data/main/de/timeZoneNames.json';
import * as argregorian from '../common/cldr-data/main/ar/ca-gregorian.json';
import * as arnumbers from '../common/cldr-data/main/ar/numbers.json';
import * as artimeZoneNames from '../common/cldr-data/main/ar/timeZoneNames.json';

/*  loadCldr method to load the culture specific JSON file.*/
loadCldr(numberingSystems, degregorian, denumbers, detimeZoneNames, argregorian, arnumbers, artimeZoneNames);

L10n.load({
  'de': {
    'daterangepicker': {
      placeholder: 'Einen Bereich auswählen',
      startLabel: 'Anfangsdatum',
      endLabel: 'Enddatum',
      applyText: 'Sich bewerben',
      cancelText: 'Stornieren',
      selectedDays: 'Ausgewählte Tage',
      days: 'Tage',
      customRange: 'benutzerdefinierten Bereich'
    }
  },
  'en': {
    'daterangepicker': {
      placeholder: 'Select a range ',
      startLabel: 'Start Date',
      endLabel: 'End Date',
      applyText: 'Apply',
      cancelText: 'Cancel',
      selectedDays: 'Selected Days',
      days: 'Days',
      customRange: 'Custom Range'
    }
  },
  'ar': {
    'daterangepicker': {
      placeholder: 'حدد نطاقا',
      startLabel: 'حتاريخ البدء',
      endLabel: 'تاريخ الانتهاء',
      applyText: 'تطبيق',
      cancelText: 'إلغاء',
      selectedDays: 'الأيام المحددة',
      days: 'أيام',
      customRange: 'نطاق مخصص'
    }
  }
});

export class Globalization extends SampleBase<{}, {}> {
  private rtl: boolean = true;
  private daterangepickerInstance: DateRangePickerComponent;
  private dropElement: HTMLSelectElement;
  public onValueChange(): void {
    let culture: string = this.dropElement.value;
    this.daterangepickerInstance.locale = culture;
    this.daterangepickerInstance.locale === 'ar' ? this.daterangepickerInstance.enableRtl = true : this.daterangepickerInstance.enableRtl = false;
  }

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
          <div className='col-lg-9'>
            <div className='daterangepicker-control-section' style={{ maxWidth: '280px' }}>
              <DateRangePickerComponent locale='de' ref={daterange => this.daterangepickerInstance = daterange} ></DateRangePickerComponent>
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
                        <option value='ar'>ar</option>
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
              DateRangePicker component was rendered with <code>German</code> culture. Here the date separator, week header, and month text content are updated based on the current culture. You can also change the control culture by selecting it from the culture options in the properties panel.
          </p>  
          <p>More information on the globalization configuration can be found in the <a href="http://ej2.syncfusion.com/react/documentation/daterangepicker/globalization.html"
            target="_blank"> documentation section</a>.</p>
        </div>
      </div>
    )
  }
}