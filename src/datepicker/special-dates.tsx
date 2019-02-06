import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DatePickerComponent, RenderDayCellEventArgs } from '@syncfusion/ej2-react-calendars';
import { addClass } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './special-style.css';

export class Special extends SampleBase<{}, {}> {
    private dateValue: Date = new Date('1/7/2017');

    public specialDate(args, name) {
        let span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.firstElementChild.setAttribute('title', name + '!');
        addClass([args.element], ['e-day', 'special', name.toLowerCase()]);
        args.element.setAttribute('data-val', name + '!');
        args.element.setAttribute('title', name + '!');
        args.element.appendChild(span);
    }

    public customDates(args: RenderDayCellEventArgs): void {
        /*Date need to be customized*/
        if (args.date.getDate() === 10) {
            this.specialDate(args, "Birthday");
        }
        if (args.date.getDate() === 15) {
            this.specialDate(args, "Farewell");
        }
        if (args.date.getDate() === 25) {
            this.specialDate(args, "Vacation");
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='datepicker-control-section'>
                        <DatePickerComponent renderDayCell={this.customDates.bind(this)} value={this.dateValue} cssClass='e-customStyle'></DatePickerComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        In the following sample, specific dates are <code>highlighted</code>. In desktop mode highlighted information about the date will be displayed when hovered.
                    </p>
                </div>
                <div id='description'>
                    <p>
                        Special Dates sample demonstrates, how to customize a specific dates in a datepicker by using
                    <code>renderDayCell</code> event. This event gets triggered on each day cell element creation that allows you to customize or disable the specific
                    dates in datepicker. Here 10, 15 and 25 date's are customized with custom styles by adding <code>e-customStyle</code> class.
          </p>
                    <p>More information on the DatePicker customization can be found in the <a href="https://ej2.syncfusion.com/react/documentation/datepicker/customization/"
                        target="_blank"> documentation section</a>.
          </p>
                </div>
            </div>
        )
    }
}
