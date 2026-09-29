import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DateRangePickerComponent, PresetsDirective, PresetDirective } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './preset-style.css';

export class Presets extends SampleBase<{}, {}> {
    public today: Date = new Date();
    public weekStart: Date = new Date(this.today);
    public weekEnd: Date = new Date(this.today);
    public monthStart: Date = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    public monthEnd: Date = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
    public lastStart: Date = new Date(this.today.getFullYear(), this.today.getMonth() - 1, 1);
    public lastEnd: Date = new Date(this.today.getFullYear(), this.today.getMonth(), 0);
    public yearStart: Date = new Date(this.today.getFullYear() - 1, 0, 1);
    public yearEnd: Date = new Date(this.today.getFullYear() - 1, 11, 31);

    constructor(props: {}) {
        super(props);
        this.weekStart.setDate(this.today.getDate() - ((this.today.getDay() + 7) % 7));
        this.weekEnd = new Date(this.weekStart);
        this.weekEnd.setDate(this.weekStart.getDate() + 6);
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='datepicker-control-section'>
                        <DateRangePickerComponent placeholder='Select a range'>
                            <PresetsDirective >
                                <PresetDirective label="This Week" start={this.weekStart} end={this.weekEnd}></PresetDirective>
                                <PresetDirective label="This Month" start={this.monthStart} end={this.monthEnd}></PresetDirective>
                                <PresetDirective label="Last Month" start={this.lastStart} end={this.lastEnd}></PresetDirective>
                                <PresetDirective label="Last Year" start={this.yearStart} end={this.yearEnd}></PresetDirective>
                            </PresetsDirective>
                        </DateRangePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        Click/Touch the DateRangePicker popup icon to view and select the list of custom preset ranges. Select the custom range option which is provided at the end of this list to open date range picker popup calendar for selecting custom ranges.
		            </p>
                </div>
                <div id='description'>
                    <p>
                        The <code>DateRangePicker</code> component has presets support to display the collection of required ranges in the popup element. User can select a required range from the list and the selected range value will be updated in the component.
		</p>
                    <p>More information on the DateRangePicker presets support can be found in the
        <a href="https://ej2.syncfusion.com/react/documentation/daterangepicker/customization/#preset-ranges" target="_blank">documentation section</a>.
		</p>
                </div>
            </div>
        )
    }
}
