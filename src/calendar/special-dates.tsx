import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CalendarComponent, RenderDayCellEventArgs, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from '../common/sample-base';
import { addClass } from '@syncfusion/ej2-base';
import './calendar-component.css';

export class Special extends SampleBase<{}, {}> {

    public specialDate(args: RenderDayCellEventArgs, name: String) {
        let span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.firstElementChild.setAttribute('title', name + '!');
        addClass([args.element], ['e-day', 'special', name.toLowerCase()]);
        args.element.setAttribute('data-val', name + '!');
        args.element.setAttribute('title', name + '!');
        args.element.appendChild(span);
    }

    public customDates(args: RenderDayCellEventArgs): void {
        /*Dates need to be customized*/
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

    public onchange(args: ChangedEventArgs): void {
        let title: string = '';
        if (args.event) {
            /*Displays selected date in the label*/
            title = (event.currentTarget as HTMLElement).getAttribute('data-val');
            title = title == null ? '' : ' ( ' + title + ' )';
        }
        (document.getElementById('date_label') as HTMLElement).textContent = 'Selected Value: ' + args.value.toLocaleDateString() + title;
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='calendar-control-section' style={{ overflow: 'auto' }}>
                        <CalendarComponent renderDayCell={this.customDates.bind(this)} change={this.onchange} className='e-customStyle' ></CalendarComponent>
                        <label id='date_label'>Selected Value:</label>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        In the below sample, specific dates are <code>highlighted</code> to bring the additional information on those dates itself to know more on selecting. Click on the special date,the tooltip information are about the date will be displayed in the label below the Calendar.</p>
                </div>
                <div id='description'>
                    <p>Special Dates sample demonstrates,
            how to customize a specific dates in a calendar by using renderDayCell event.
            This event gets triggered on each day cell element creation that allows
             you to customize or disable the specific dates in calendar. Here 10, 15
             and 25 date's are customized with custom styles by adding the <code>e-customStyle</code> class.</p>
                    <p>
                        More information on the customization can be found in this <a target='_blank'
                            href='https://ej2.syncfusion.com/react/documentation/calendar/customization.html#day-cell-format'> documentation</a> section.
          </p>
                </div>
            </div>
        )
    }
}


