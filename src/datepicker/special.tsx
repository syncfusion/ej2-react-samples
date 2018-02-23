import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DatePickerComponent, RenderDayCellEventArgs } from '@syncfusion/ej2-react-calendars';
import { addClass } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './datepicker-component.css';

export class Special extends SampleBase<{}, {}> {
    private dateValue: Date = new Date('1/7/2017')
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='datepicker-control-section'>
                        <DatePickerComponent renderDayCell={customDates} value={this.dateValue} cssClass='e-customStyle'></DatePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        In the following sample, specific dates are <code>highlighted</code> to notify the additional information of that date. Click the special date and the tooltip information about the date will be displayed when hovered.</p>
                </div>
                <div id='description'>
                    <p>
                        Special Dates sample demonstrates, how to customize a specific dates in a datepicker by using
                    <code>renderDayCell</code> event. This event gets triggered on each day cell element creation that allows you to customize or disable the specific
                    dates in datepicker. Here 10, 15 and 25 date's are customized with custom styles by adding <code>e-customStyle</code> class.
          </p>
                    <p>More information on the DatePicker customization can be found in the <a href="http://ej2.syncfusion.com/react/documentation/datepicker/customization.html"
                        target="_blank"> documentation section</a>.
          </p>
                </div>
            </div>
        )
    }
}
function customDates(args: RenderDayCellEventArgs): void {
    /*Date need to be customized*/
    if (args.date.getDate() === 10) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        addClass([args.element], ['special', 'e-day', 'birthday']);
        args.element.setAttribute('title', ' Birthday !');
        args.element.appendChild(span);
    }
    if (args.date.getDate() === 15) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        addClass([args.element], ['special', 'e-day', 'farewell']);
        args.element.setAttribute('title', 'Farewell !');
        args.element.appendChild(span);

    }
    if (args.date.getDate() === 25) {
        let span: HTMLElement;
        span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        addClass([args.element], ['special', 'e-day', 'vacation']);
        args.element.setAttribute('title', 'Vacation !');
        args.element.appendChild(span);

    }
}