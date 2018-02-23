import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DateRangePickerComponent, PresetsDirective, PresetDirective } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import './daterangepicker-component.css';

export class Presets extends SampleBase<{}, {}> {
    public today: Date = new Date(new Date().toDateString());
    public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
    public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
        - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
    public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
    public monthEnd: Date = this.today;
    public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
    public lastEnd: Date = this.today;
    public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
    public yearEnd: Date = this.today;
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
            </div>
        )
    }
}
