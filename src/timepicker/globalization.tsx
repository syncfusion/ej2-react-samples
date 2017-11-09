import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './timepicker-component.css';
import { loadCldr, L10n } from '@syncfusion/ej2-base';
import { TimePickerComponent, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as numberingSystems from '../common/cldr-data/supplemental/numberingSystems.json';
import * as zhgregorian from '../common/cldr-data/main/zh/ca-gregorian.json';
import * as zhnumbers from '../common/cldr-data/main/zh/numbers.json';
import * as degregorian from '../common/cldr-data/main/de/ca-gregorian.json';
import * as denumbers from '../common/cldr-data/main/de/numbers.json';
import * as vigregorian from '../common/cldr-data/main/vi/ca-gregorian.json';
import * as vinumbers from '../common/cldr-data/main/vi/numbers.json';
import * as argregorian from '../common/cldr-data/main/ar/ca-gregorian.json';
import * as arnumbers from '../common/cldr-data/main/ar/numbers.json';

/*  loadCldr method to load the culture specific JSON file.*/
loadCldr(numberingSystems, zhgregorian, zhnumbers, degregorian, denumbers, vigregorian, vinumbers, argregorian, arnumbers);

/*loads the localization text*/
L10n.load({
    'de': {
        'timepicker': {
            placeholder: 'Zeit auswählen'
        }
    },
    'zh': {
        'timepicker': {
            placeholder: '选择时间'
        }
    },
    'vi': {
        'timepicker': {
            placeholder: 'Chọn thời gian'
        }
    },
    'en': {
        'timepicker': {
            placeholder: 'Select Time'
        }
    },
    'ar': {
        'timepicker': { placeholder: 'حدد الوقت' }
    }
});

let value: Date = new Date();

export class Globalization extends SampleBase<{}, {}> {
    private timepickerInstance: TimePickerComponent;
    private dropElement: HTMLSelectElement;
    public onValueChange(): void {
        /*Apply selected locale to the component*/
        let culture: string = this.dropElement.value;
        this.timepickerInstance.locale = culture
        this.timepickerInstance.enableRtl = culture === 'ar' ? true : false;
    }

    render() {
        return (
            <div className='control-pane culture'>
                <div className='control-section row'>
                    <div className='col-lg-9'>
                        <div className='timepicker-control-section'>
                            <TimePickerComponent value={value} locale='de' ref={calendar => this.timepickerInstance = calendar} ></TimePickerComponent>
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
                                                <option value='ar'>ar</option>
                                                <option value='de' selected>de</option>
                                                <option value='en'>en</option>
                                                <option value='vi'>vi</option>
                                                <option value='zh'>zh</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        In this sample, the TimePicker has been configured with <code>German</code> culture. To change this current culture, go to the properties panel at the right side and select a culture from the dropdown options.
                  </p>
                </div>
                <div id='description'>
                    <p>
                        TimePicker component was rendered with <code>German</code> culture. Here, the time separator and time format are
              specific to the current culture.
          </p>
                    <p>
                        You can also change the control culture by selecting it from the culture options in the properties panel.
          </p>
                    <p>
                        More information on the internationalization configuration can be found in the <a target='_blank'
                            href='http://ej2.syncfusion.com/react/documentation/base/internationalization.html'>documentation</a> section.
        </p>
                </div>
            </div>
        )
    }
}
