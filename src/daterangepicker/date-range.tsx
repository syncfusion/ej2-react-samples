import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './daterangepicker-component.css';

export class DateRange extends SampleBase<{}, {}> {

    private minDate: Date = new Date('1/15/2017');
    private maxDate: Date = new Date('12/20/2017');
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='daterangepicker-control-section'>
                        <DateRangePickerComponent min={this.minDate} max={this.maxDate}></DateRangePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        In this sample, the date ranges from <code>Jan 15, 2017 - Dec 20, 2017</code> have been set. All the other dates are out of range and restricted to set or select. </p>    
                </div>
                <div id='description'>
                    <p>
                        DateRangePicker has <code>min</code> and <code>max</code> supports to restrict the user to select a value from the given range.
              Only the values in this range will be enabled.
              In this sample, we have specified <code>min</code> range as <code>Jan 15, 2017</code> and <code>max</code> range as <code>Dec 20, 2017</code>. User will be able to select the values between this range only.
          </p>
                    <p>More information on the DateRangePicker min/max support can be found in the
            <a href="https://ej2.syncfusion.com/react/documentation/daterangepicker/range-selection.html#restrict-the-range-within-a-range"
                            target="_blank"> documentation section</a>.
          </p>
                </div>
            </div>
        )
    }
}