import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { DateRangePickerComponent, PresetsDirective, PresetDirective } from '@syncfusion/ej2-react-calendars';
import './preset-style.css';

function Presets() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const today: Date = new Date(new Date().toDateString());
    const weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
    const weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
        - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
    const monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
    const monthEnd: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)).toDateString());
    const lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
    const lastEnd: Date = new Date(new Date(new Date().setDate(0)).toDateString());
    const yearStart: Date = new Date(new Date(new Date().getFullYear() - 1, 0, 1).toDateString());
    const yearEnd: Date = new Date(new Date(new Date().getFullYear() - 1, 11, 31).toDateString());
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='datepicker-control-section'>
                    <DateRangePickerComponent placeholder='Select a range'>
                        <PresetsDirective >
                            <PresetDirective label="This Week" start={weekStart} end={weekEnd}></PresetDirective>
                            <PresetDirective label="This Month" start={monthStart} end={monthEnd}></PresetDirective>
                            <PresetDirective label="Last Month" start={lastStart} end={lastEnd}></PresetDirective>
                            <PresetDirective label="Last Year" start={yearStart} end={yearEnd}></PresetDirective>
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
export default Presets;