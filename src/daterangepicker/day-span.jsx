import * as React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './dayspan-style.css';
export class DaySpan extends SampleBase {
    constructor() {
        super(...arguments);
        this.minDays = 5;
        this.maxDays = 10;
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <div className='daterangepicker-control-section'>
                        <DateRangePickerComponent minDays={this.minDays} maxDays={this.maxDays}></DateRangePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        In this sample, your date range selection is restricted to select <code>minimum</code> five days and <code>maximum</code> ten days.
                    </p>    
                </div>
                <div id="description">
                    <p>
                        DateRangePicker has <code>minDays</code> and <code>maxDays</code> supports to force the user to select the minimum and maximum number of days in the range. Only the values in this range will be enabled.
          </p>
		  	<p>
              For example, in some hotel booking website, we need to book rooms that includes packages like minimum 3 days to maximum 5 days. For this scenario this feature can be used.
			</p>

            <p>More information on the DateRangePicker minDays/maxDays support can be found in the
              <a href="https://ej2.syncfusion.com/react/documentation/daterangepicker/range-selection/#range-span" target="_blank"> documentation section</a>.
          </p>
                </div>

            </div>);
    }
}
